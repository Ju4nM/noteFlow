import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login (loginDto: LoginDto) {
    const { email, password } = loginDto;
    const target: User = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!target) throw new HttpException(null, HttpStatus.UNAUTHORIZED);

    const passwordMatching: boolean = await bcrypt.compare(password, target.password);
    if (!passwordMatching)  throw new HttpException(null, HttpStatus.UNAUTHORIZED);

    const accessToken = await this.jwtService.signAsync({ id: target.id }, { secret: process.env.JWT_SECRET });

    return { accessToken };
  }
}
