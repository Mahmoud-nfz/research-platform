import { IsJWT } from 'class-validator';

export class JwtRefreshDto {
  @IsJWT()
  access_token: string;

  @IsJWT()
  refresh_token: string;
}
