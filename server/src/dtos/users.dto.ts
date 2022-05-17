import { IsArray, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public phone: string;

  @IsString()
  public password: string;

  @IsString()
  public image: string;

  @IsString()
  public verified: string;

  @IsString()
  public group: string;

  @IsArray()
  public roles: Array<string>;
}
