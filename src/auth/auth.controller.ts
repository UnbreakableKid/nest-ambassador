import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdatePasswordDto } from './dtos/updatePassword.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDto) {
    const { passwordConfirm, ...data } = body;

    if (data.password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
      is_ambassador: false,
    });
  }

  @Post('admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Incorrect password');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
    });

    response.cookie('token', jwt, {
      httpOnly: true,
    });

    return { message: 'Logged in successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('admin/user')
  async user(@Req() request: Request) {
    const cookie = request.cookies.token;

    const { id } = await this.jwtService.verifyAsync(cookie);

    const user = await this.userService.findOne({ id });

    return user;
  }

  @UseGuards(AuthGuard)
  @Post('admin/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');

    return { message: 'Logged out successfully' };
  }

  @UseGuards(AuthGuard)
  @Put('admin/users/info')
  async updateUser(@Body() body: UpdateUserDto, @Req() request: Request) {
    const cookie = request.cookies.token;

    const { id } = await this.jwtService.verifyAsync(cookie);

    const user = await this.userService.findOne({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userService.update(id, body);

    return this.userService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('admin/users/password')
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @Req() request: Request,
  ) {
    if (body.password !== body.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const cookie = request.cookies.token;

    const { id } = await this.jwtService.verifyAsync(cookie);

    const user = await this.userService.findOne({ id });

    await this.userService.update(id, {
      password: await bcrypt.hash(body.password, 12),
    });

    return this.userService.findOne({ id });
  }
}
