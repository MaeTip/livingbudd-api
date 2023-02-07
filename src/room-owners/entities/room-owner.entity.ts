import { RoomOwner } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoomOwnerEntity implements RoomOwner {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  contact: string;
  
  @ApiProperty()
  room_location: string;

  @ApiProperty()
  room_price: number;

  @ApiProperty()
  room_condition: string;

  @ApiProperty()
  room_detail: string;

  @ApiProperty()
  is_mark_as_read: boolean;

  @ApiProperty()
  admin_comment: string;
}