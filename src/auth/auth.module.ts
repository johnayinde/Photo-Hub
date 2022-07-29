import { Module, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { AuthHelperService } from '../common/helper/auth-helper.service';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './../common/strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthHelperService, LocalStrategy, SessionSerializer],
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
