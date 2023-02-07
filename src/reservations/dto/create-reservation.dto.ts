import { Gender, Vehicle } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ToBoolean } from '@common/decorator';

export class CreateReservationDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @ValidateIf((o) => o.email)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @ApiProperty()
  // @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  contact: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  number_of_tenant: number;

  @ApiProperty()
  @ToBoolean()
  @IsOptional()
  has_pet: boolean;

  @ApiProperty()
  @ToBoolean()
  @IsOptional()
  air_conditioner_request: boolean;

  @ApiProperty()
  @IsOptional()
  // @IsEnum(Vehicle)
  vehicle: Vehicle;

  @ApiProperty()
  @IsString()
  @IsOptional()
  working_address: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  additional_request: string;
}
