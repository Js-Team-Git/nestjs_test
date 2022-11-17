import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'int123$%^',
      database: 'nest',
      entities: [UsersEntity],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      }
    }),UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
