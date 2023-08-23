import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordException } from 'src/exceptions/invalid-password.exception';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(username: string, password: string): Promise<any> {
        const user = await this.userService.findUserByUsername(username);
        var isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new InvalidPasswordException();
        }
        const payload = { sub: user.id, username: user.username, email: user.email };
        const token = await this.jwtService.signAsync(payload)
        return {
            access_token: token,
            username: user.username,
            email: user.email,
        };
    }
}