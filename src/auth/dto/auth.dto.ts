import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserSignUpDto extends AuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class AdminSignUpDto extends UserSignUpDto {
  @IsString()
  role?: Role = Role.USER
}