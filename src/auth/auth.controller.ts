import { SignInDto } from "./sign-in.dto";
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Request, Res } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Public } from "./auth.guard";
import { AuthGuard } from "./auth.guard";
import { UserService } from "src/user/user.service";
import { Response } from "express";
import { InvalidPasswordException } from "src/exceptions/invalid-password.exception";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
        try {
            const { access_token, username, email } = await this.authService.signIn(signInDto.username, signInDto.password);
            res.cookie('access_token', access_token, { httpOnly: true });
            res.json({ access_token, username, email });
        } catch (error) {
            if (error instanceof InvalidPasswordException) {
                res.status(HttpStatus.UNAUTHORIZED).json({ error: 'Invalid password' });
            } else {
                throw error;
            }
        }
    }

    @Get('profile')
    getProfile(@Request() req: any) {
        return req.user
    }
}
