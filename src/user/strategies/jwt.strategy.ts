import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'your_secret_key',
        });
    }

    async validate(payload: any) {
        console.log('Decoded JWT Payload:', payload);

        if (!payload || !payload.sub) {
            throw new UnauthorizedException('Invalid JWT token');
        }

        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
