import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, SharedModule],
})
export class AuthModule {}
