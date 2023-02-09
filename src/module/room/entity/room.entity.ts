import { Room } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export const FacilityList: string[] = new Array("wifi", "lift", "parking", "security", "keycard_access_control", "cctv", "swimming_pool" ,"fitness")  
export const AmenityList: string[] = new Array("air_conditioner", "tv", "digital_door_lock", "water_heater", "furnished", "refrigerator")  

export class RoomEntity implements Room {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  google_map: string;

  @ApiProperty()
  building: string;

  @ApiProperty()
  floor: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  number_of_bedroom: number;

  @ApiProperty()
  number_of_bathroom: number;

  @ApiProperty()
  maintenance_fee: number;

  @ApiProperty()
  amenities: string;

  @ApiProperty()
  facilities: string;

  @ApiProperty()
  nearby_area: string;

  @ApiProperty()
  is_created_by_owner: boolean

  @ApiProperty()
  rental_price: number

  @ApiProperty()
  rental_desposit: number

  @ApiProperty()
  rental_advance_payment: number
}
