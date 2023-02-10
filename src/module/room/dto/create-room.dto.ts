import { ToBoolean } from '@common/decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsOptional()
  google_map: string;

  @ApiProperty()
  @IsOptional()
  building: string;

  @ApiProperty()
  @IsOptional()
  floor: string;

  @ApiProperty()
  @IsInt()
  size: number;

  @ApiProperty()
  @IsInt()
  number_of_bedroom: number;

  @ApiProperty()
  @IsOptional()
  number_of_bathroom: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  maintenance_fee: number;

  @ApiProperty()
  @IsOptional()
  amenities: string;

  @ApiProperty()
  @IsOptional()
  facilities: string;

  @ApiProperty()
  @IsOptional()
  nearby_area: string;

  @ApiProperty()
  @IsOptional()
  detail: string;

  @ApiProperty()
  @ToBoolean()
  is_created_by_owner: boolean;

  @ApiProperty()
  @IsInt()
  rental_price: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  rental_deposit: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  rental_advance_payment: number;
}
