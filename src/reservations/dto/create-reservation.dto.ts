import { Gender, Vehicle } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsEnum, IsNumber, IsBoolean, IsInt } from 'class-validator';
import { ToBoolean } from "@common/decorator"

export class CreateReservationDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @ApiProperty()
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    age: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    contact: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    numberOfTenant: number;

    @ApiProperty()
    @IsNotEmpty()
    @ToBoolean()
    has_pet: boolean;

    @ApiProperty()
    @IsEnum(Vehicle)
    @IsNotEmpty()
    vehicle: Vehicle

    @ApiProperty()
    @IsString()
    working_address: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    additional_request: string;
}

