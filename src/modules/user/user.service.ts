import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userData = await this.userRepository.create(createUserDto);

    return this.userRepository.save(userData);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const userData = await this.userRepository.findOneBy({ id });

    if (!userData) {
      throw new HttpException('User Not Found', 404);
    }

    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.findOne(id);
    const userDataUpdate = this.userRepository.merge(findUser, updateUserDto);

    return await this.userRepository.save(userDataUpdate);
  }

  async remove(id: number) {
    const deleteUser = await this.findOne(id);

    return await this.userRepository.remove(deleteUser);
  }
}
