import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private usersService;
    private prisma;
    private jwtService;
    private config;
    private mailService;
    constructor(usersService: UsersService, prisma: PrismaService, jwtService: JwtService, config: ConfigService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
    resendVerification(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        status: string;
        message: string;
        onboardingDone: boolean;
        user: {
            id: string;
            nama: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            onboardingDone: boolean;
            dusun: string | null;
            avatarUrl: string | null;
            bio: string | null;
            themePreference: import(".prisma/client").$Enums.ThemePreference;
            kontak: string | null;
        };
    }>;
    validateUser(email: string, password: string): Promise<{
        nama: string;
        phone: string | null;
        bio: string | null;
        avatarUrl: string | null;
        keahlian: import(".prisma/client").$Enums.SkillCategory[];
        ketersediaan: string | null;
        kabupatenKota: string | null;
        level: number;
        id: string;
        email: string;
        passwordHash: string;
        emailVerifiedAt: Date | null;
        kontak: string | null;
        dusun: string | null;
        rt: string | null;
        rw: string | null;
        role: import(".prisma/client").$Enums.Role;
        onboardingDone: boolean;
        age: number | null;
        bidang: string | null;
        xpTotal: number;
        currency: number;
        themePreference: import(".prisma/client").$Enums.ThemePreference;
        bingkaiAktifId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto, ip?: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            nama: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            onboardingDone: boolean;
            dusun: string | null;
            avatarUrl: string | null;
            bio: string | null;
            themePreference: import(".prisma/client").$Enums.ThemePreference;
            kontak: string | null;
        };
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private issueTokens;
    refresh(userId: string, oldRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            nama: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            onboardingDone: boolean;
            avatarUrl: string | null;
            bio: string | null;
            themePreference: import(".prisma/client").$Enums.ThemePreference;
            kontak: string | null;
        };
    }>;
    logout(userId: string, refreshToken?: string): Promise<{
        message: string;
    }>;
}
