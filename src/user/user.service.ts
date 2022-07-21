import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(new User(createUserDto));
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(email: any): Promise<User> {
    return this.userRepository.findOne(email);
  }
}
