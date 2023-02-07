import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsInt, IsOptional, ValidateIf, IsBoolean } from 'class-validator';

export class UpdateRoomOwnerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    @ValidateIf(o => o.email)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contact: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    room_location: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    room_price: number;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    room_condition: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    room_detail: string;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsBoolean()
    @IsOptional()
    is_mark_as_read?: boolean;

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    admin_comment?: string;  
}

