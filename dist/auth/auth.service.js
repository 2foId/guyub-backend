"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const token_util_1 = require("./token.util");
const SALT_ROUNDS = 12;
const LOGIN_RATE_LIMIT = 5;
const LOGIN_RATE_TTL = 15 * 60 * 1000;
const loginAttempts = new Map();
function getClientIp(req) {
    return req.ip || req.connection?.remoteAddress || 'unknown';
}
function checkLoginRateLimit(ip) {
    const now = Date.now();
    const attempt = loginAttempts.get(ip);
    if (!attempt)
        return;
    if (now - attempt.firstAttempt > LOGIN_RATE_TTL) {
        loginAttempts.delete(ip);
        return;
    }
    if (attempt.count >= LOGIN_RATE_LIMIT) {
        throw new common_1.BadRequestException('Terlalu banyak percobaan login. Coba lagi dalam 15 menit.');
    }
}
function recordLoginAttempt(ip) {
    const now = Date.now();
    const attempt = loginAttempts.get(ip);
    if (!attempt || now - attempt.firstAttempt > LOGIN_RATE_TTL) {
        loginAttempts.set(ip, { count: 1, firstAttempt: now });
    }
    else {
        attempt.count += 1;
    }
}
function clearLoginAttempts(ip) {
    loginAttempts.delete(ip);
}
let AuthService = class AuthService {
    constructor(usersService, prisma, jwtService, config, mailService) {
        this.usersService = usersService;
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
        this.mailService = mailService;
    }
    async register(dto) {
        const existing = await this.usersService.findByEmail(dto.email);
        if (existing) {
            throw new common_1.ConflictException('Email sudah terdaftar');
        }
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        const user = await this.usersService.create({
            nama: dto.nama,
            email: dto.email,
            passwordHash,
            dusun: dto.dusun,
            rt: dto.rt,
            rw: dto.rw,
        });
        const { raw, hash } = (0, token_util_1.generateToken)();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await this.prisma.emailToken.create({
            data: {
                userId: user.id,
                tokenHash: hash,
                purpose: 'VERIFY_EMAIL',
                expiresAt,
            },
        });
        await this.mailService.sendVerification(dto.email, raw);
        return {
            message: 'Registrasi berhasil. Cek email kamu untuk verifikasi.',
            userId: user.id,
        };
    }
    async resendVerification(dto) {
        const message = 'Jika email belum terverifikasi, tautan verifikasi telah dikirim.';
        const user = await this.usersService.findByEmail(dto.email);
        if (!user || user.emailVerifiedAt) {
            return { message };
        }
        const { raw, hash } = (0, token_util_1.generateToken)();
        await this.prisma.emailToken.create({
            data: {
                userId: user.id,
                tokenHash: hash,
                purpose: 'VERIFY_EMAIL',
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });
        await this.mailService.sendVerification(user.email, raw);
        return { message };
    }
    async verifyEmail(token) {
        if (!token?.trim()) {
            throw new common_1.BadRequestException('Token tidak ditemukan.');
        }
        const tokenHash = (0, token_util_1.hashToken)(token);
        const result = await this.prisma.$transaction(async (tx) => {
            const emailToken = await tx.emailToken.findUnique({
                where: { tokenHash },
                include: { user: true },
            });
            if (!emailToken || emailToken.purpose !== 'VERIFY_EMAIL') {
                throw new common_1.BadRequestException('Token verifikasi tidak valid.');
            }
            if (emailToken.user.emailVerifiedAt) {
                return {
                    status: 'ALREADY_VERIFIED',
                    userId: emailToken.userId,
                };
            }
            if (emailToken.expiresAt <= new Date()) {
                throw new common_1.BadRequestException('Token verifikasi sudah kedaluwarsa.');
            }
            if (emailToken.usedAt) {
                throw new common_1.BadRequestException('Token verifikasi sudah digunakan. Minta tautan baru.');
            }
            const now = new Date();
            const claimed = await tx.emailToken.updateMany({
                where: {
                    id: emailToken.id,
                    purpose: 'VERIFY_EMAIL',
                    usedAt: null,
                    expiresAt: { gt: now },
                },
                data: { usedAt: now },
            });
            if (claimed.count !== 1) {
                const currentToken = await tx.emailToken.findUnique({
                    where: { id: emailToken.id },
                    include: { user: true },
                });
                if (currentToken?.user.emailVerifiedAt) {
                    return {
                        status: 'ALREADY_VERIFIED',
                        userId: currentToken.userId,
                    };
                }
                if (currentToken && currentToken.expiresAt <= new Date()) {
                    throw new common_1.BadRequestException('Token verifikasi sudah kedaluwarsa.');
                }
                throw new common_1.BadRequestException('Token verifikasi sudah digunakan. Minta tautan baru.');
            }
            await tx.user.update({
                where: { id: emailToken.userId },
                data: { emailVerifiedAt: now },
            });
            return {
                status: 'VERIFIED',
                userId: emailToken.userId,
            };
        });
        const user = await this.usersService.findById(result.userId);
        if (!user)
            throw new common_1.BadRequestException('Akun verifikasi tidak ditemukan.');
        const tokens = await this.issueTokens(user.id, user.email, user.role);
        return {
            status: result.status,
            message: 'Email kamu sudah terverifikasi. Silakan masuk.',
            onboardingDone: user.onboardingDone,
            user: {
                id: user.id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                onboardingDone: user.onboardingDone,
                dusun: user.dusun,
                avatarUrl: user.avatarUrl,
                bio: user.bio,
                themePreference: user.themePreference,
                kontak: user.kontak,
            },
            ...tokens,
        };
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new common_1.UnauthorizedException('Email atau password salah');
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch)
            throw new common_1.UnauthorizedException('Email atau password salah');
        if (!user.emailVerifiedAt) {
            throw new common_1.UnauthorizedException('Silakan verifikasi email terlebih dahulu.');
        }
        return user;
    }
    async login(dto, ip) {
        if (ip) {
            checkLoginRateLimit(ip);
        }
        try {
            const user = await this.validateUser(dto.email, dto.password);
            if (ip)
                clearLoginAttempts(ip);
            const tokens = await this.issueTokens(user.id, user.email, user.role);
            return {
                user: {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                    onboardingDone: user.onboardingDone,
                    dusun: user.dusun,
                    avatarUrl: user.avatarUrl,
                    bio: user.bio,
                    themePreference: user.themePreference,
                    kontak: user.kontak,
                },
                ...tokens,
            };
        }
        catch (err) {
            if (ip)
                recordLoginAttempt(ip);
            throw err;
        }
    }
    async forgotPassword(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            return { message: 'Jika email terdaftar, tautan reset password telah dikirim.' };
        }
        const { raw, hash } = (0, token_util_1.generateToken)();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        await this.prisma.emailToken.create({
            data: {
                userId: user.id,
                tokenHash: hash,
                purpose: 'RESET_PASSWORD',
                expiresAt,
            },
        });
        await this.mailService.sendResetPassword(user.email, raw);
        return { message: 'Jika email terdaftar, tautan reset password telah dikirim.' };
    }
    async resetPassword(dto) {
        const tokenHash = (0, token_util_1.hashToken)(dto.token);
        const emailToken = await this.prisma.emailToken.findUnique({
            where: { tokenHash },
            include: { user: true },
        });
        if (!emailToken) {
            throw new common_1.BadRequestException('Token reset password tidak valid.');
        }
        if (emailToken.purpose !== 'RESET_PASSWORD') {
            throw new common_1.BadRequestException('Token reset password tidak valid.');
        }
        if (emailToken.usedAt) {
            throw new common_1.BadRequestException('Token reset password sudah digunakan.');
        }
        if (emailToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Token reset password sudah kedaluwarsa.');
        }
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        await this.prisma.user.update({
            where: { id: emailToken.userId },
            data: { passwordHash },
        });
        await this.prisma.emailToken.update({
            where: { id: emailToken.id },
            data: { usedAt: new Date() },
        });
        return { message: 'Password berhasil diubah. Silakan login.' };
    }
    async issueTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: this.config.get('JWT_ACCESS_EXPIRES_IN') ?? '15m',
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN') ?? '7d',
        });
        const tokenHash = await bcrypt.hash(refreshToken, SALT_ROUNDS);
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: { userId, tokenHash, expiresAt },
        });
        return { accessToken, refreshToken };
    }
    async refresh(userId, oldRefreshToken) {
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException();
        const storedTokens = await this.prisma.refreshToken.findMany({
            where: { userId, revoked: false, expiresAt: { gt: new Date() } },
        });
        let matched = null;
        for (const stored of storedTokens) {
            if (await bcrypt.compare(oldRefreshToken, stored.tokenHash)) {
                matched = stored;
                break;
            }
        }
        if (!matched) {
            throw new common_1.UnauthorizedException('Sesi tidak valid, silakan login ulang');
        }
        await this.prisma.refreshToken.update({
            where: { id: matched.id },
            data: { revoked: true },
        });
        const tokens = await this.issueTokens(user.id, user.email, user.role);
        return {
            user: { id: user.id, nama: user.nama, email: user.email, role: user.role, onboardingDone: user.onboardingDone, avatarUrl: user.avatarUrl, bio: user.bio, themePreference: user.themePreference, kontak: user.kontak },
            ...tokens,
        };
    }
    async logout(userId, refreshToken) {
        if (!refreshToken) {
            return { message: 'Logout berhasil' };
        }
        const storedTokens = await this.prisma.refreshToken.findMany({
            where: { userId, revoked: false },
        });
        for (const stored of storedTokens) {
            if (await bcrypt.compare(refreshToken, stored.tokenHash)) {
                await this.prisma.refreshToken.update({
                    where: { id: stored.id },
                    data: { revoked: true },
                });
                break;
            }
        }
        return { message: 'Logout berhasil' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map