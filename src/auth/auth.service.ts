import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, AdminSignUpDto, UserSignUpDto } from './dto';
import { AuthEntity } from './entity/auth.entity';
import * as argon from 'argon2';
import { Role } from '@prisma/client';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService, private jwt: JwtService) {}

  async signup(dto: UserSignUpDto): Promise<AuthEntity> {
    const hash = await argon.hash(dto.password);
    const secret = this.config.get('JWT_SECRET');
    let authEntity: AuthEntity;

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          email: true,
        },
      });

      const token = await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
      }, {
        expiresIn: '5d',
        secret: secret,
      });

      authEntity = {
        access_token: token,
        user_id: user.id as unknown as string
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }

    return authEntity;
  }

  async adminSignup(dto: AdminSignUpDto) {
    const hash = await argon.hash(dto.password);

    try {
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          role: Role.ADMIN
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        hash: true,
      },
    });

    const isPasswordMatch = await argon.verify(user.hash, dto.password);

    if (!isPasswordMatch) throw new ForbiddenException('Credentials incorrect');
    if (!user) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const secret = this.config.get('JWT_SECRET');
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5d',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
