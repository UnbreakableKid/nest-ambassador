import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;
}
