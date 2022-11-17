import {IsEmail, IsNumberString, IsString } from "class-validator";

export class UsersDTO {
  @IsNumberString()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  }