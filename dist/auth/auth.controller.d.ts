import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private authService;
    private config;
    constructor(authService: AuthService, config: ConfigService);
    private setRefreshCookie;
    private clearRefreshCookie;
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
    }>;
    resendVerification(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyEmail(token: string, res: Response): Promise<{
        accessToken: string;
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
    login(dto: LoginDto, res: Response, req: any): Promise<{
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
        accessToken: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
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
        accessToken: string;
    }>;
    logout(userId: string, req: Request, res: Response): Promise<{
        message: string;
    }>;
    me(user: any): Promise<{
        user: any;
    }>;
}
