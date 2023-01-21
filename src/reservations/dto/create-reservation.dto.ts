import { Gender, Vehicle } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ToBoolean } from "@common/decorator"

export class CreateReservationDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty()
    // @IsEnum(Gender)
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
    @IsOptional()
    contact: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    number_of_tenant: number;

    @ApiProperty()
    @ToBoolean()
    @IsOptional()
    has_pet: boolean;

    @ApiProperty()
    @IsOptional()
    // @IsEnum(Vehicle)
    vehicle: Vehicle

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

