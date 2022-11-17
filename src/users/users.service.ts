import { Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    import { UsersEntity } from './users.entity';
    import { UsersDTO } from './users.dto';

    @Injectable()
    export class UsersService {
      constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
      ) {}

      async showAll():Promise<UsersEntity[]> {
        return await this.usersRepository.find();
      }

      async create(data: UsersDTO) {
        const user = this.usersRepository.create(data);
        await this.usersRepository.save(data);
        return user;
      }

      async findByEmail(email: string): Promise<UsersDTO> {
        return await this.usersRepository.findOne({
          where: {
            email: email,
          },
        });
      }

      // async findWithFn(fn: string) {
      //   return await this.usersRepository.createQueryBuilder('users').where({ firstName: fn }).getOne()
      // }


      // async read(id: number) {
      //   return await this.usersRepository.findOne({ where: { id: id } });
      // }

      async read(id: number): Promise<UsersEntity> {
        const existingUserId = await this.usersRepository.createQueryBuilder('user').where({ id: id }).getOne()
        console.log(existingUserId);
        if (!existingUserId) {
          throw new NotFoundException(`User with Id:${id} does not exists`)
        }
        return await this.usersRepository.findOneBy({ id })
      }

      async update(id: number, data: Partial<UsersDTO>) {
        await this.usersRepository.update({ id }, data);
      }
        // return await this.usersRepository.findOne({ id });

      async destroy(id: number) {
        const existingUserId = await this.usersRepository.createQueryBuilder('user').where({ id: id }).getOne()
        console.log(existingUserId);
        if (!existingUserId) {
          throw new NotFoundException(`User with Id:${id} does not exists`)
        }
        await this.usersRepository.delete({ id });
        return { deleted: true };
      }

    }