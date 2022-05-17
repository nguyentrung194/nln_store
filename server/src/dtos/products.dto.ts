import { Review } from '@/interfaces/interface';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber()
  public quantity: number;

  @IsString()
  public description: string;

  @IsArray()
  public categories: Array<string>;

  @IsString()
  public unit: string;

  @IsNumber()
  public price: number;

  @IsArray()
  public images: Array<string>;

  @IsArray()
  public reviews: Array<Review>;

  @IsString()
  public status: string;
}
