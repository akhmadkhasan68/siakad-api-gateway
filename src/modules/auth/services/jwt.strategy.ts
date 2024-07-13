import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config } from 'src/config';
import { UserService } from './user.service';
import { IJwtPayload } from 'src/common/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    
    return user;
  }
}
