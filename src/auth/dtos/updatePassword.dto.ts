import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
