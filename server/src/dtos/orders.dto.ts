import { Client, Item } from '@/interfaces/interface';
import { IsArray, IsObject, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsObject()
  public user: Client;

  @IsArray()
  products: Array<Item>;

  @IsString()
  status: string;
}
