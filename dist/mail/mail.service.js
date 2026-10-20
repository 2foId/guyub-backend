"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let MailService = MailService_1 = class MailService {
    constructor() {
        this.logger = new common_1.Logger(MailService_1.name);
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT ?? 465),
            secure: process.env.MAIL_SECURE !== 'false',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    async onModuleInit() {
        if (process.env.MAIL_DRIVER === 'console')
            return;
        try {
            await this.transporter.verify();
            this.logger.log('SMTP Gmail siap');
        }
        catch (err) {
            this.logger.error('SMTP gagal terhubung. Cek MAIL_USER dan MAIL_PASS.', err);
        }
    }
    async send(to, subject, html, text) {
        if (process.env.MAIL_DRIVER === 'console') {
            this.logger.log(`[MAIL ke ${to}] ${subject}\n${text}`);
            return;
        }
        await this.transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            html,
            text,
        });
    }
    sendVerification(to, token) {
        const link = `${process.env.APP_URL}/verify-email?token=${token}`;
        return this.send(to, 'Verifikasi email Guyub Ngapak', `<p>Klik tautan berikut untuk mengaktifkan akun kamu:</p>
       <p><a href="${link}">${link}</a></p>
       <p>Tautan ini berlaku 24 jam.</p>`, `Verifikasi akun kamu: ${link} (berlaku 24 jam)`);
    }
    sendResetPassword(to, token) {
        const link = `${process.env.APP_URL}/reset-password?token=${token}`;
        return this.send(to, 'Reset password Guyub Ngapak', `<p>Klik tautan berikut untuk membuat password baru:</p>
       <p><a href="${link}">${link}</a></p>
       <p>Tautan ini berlaku 1 jam. Abaikan email ini jika kamu tidak meminta reset.</p>`, `Reset password: ${link} (berlaku 1 jam)`);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)()
], MailService);
//# sourceMappingURL=mail.service.js.map