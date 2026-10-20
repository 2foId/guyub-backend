import { OnModuleInit } from '@nestjs/common';
export declare class MailService implements OnModuleInit {
    private readonly logger;
    private readonly transporter;
    onModuleInit(): Promise<void>;
    private send;
    sendVerification(to: string, token: string): Promise<void>;
    sendResetPassword(to: string, token: string): Promise<void>;
}
