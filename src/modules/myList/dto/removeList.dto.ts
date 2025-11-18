import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveListDTO {
  @IsString()
  @IsNotEmpty()
  itemId: string;
}
