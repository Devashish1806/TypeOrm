import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateUserDto, GetUserDto } from './user.dto';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    let user = createUserDto;
    user._id = uuidv4();
    return this.userRepository.save(user);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(getUserDto: GetUserDto): Promise<User> {
    return this.userRepository.findOne({});
  }
}
