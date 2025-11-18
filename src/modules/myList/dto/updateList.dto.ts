import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export const GenreEnum = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Romance',
  'SciFi',
];

export class UpdateMyListDTO {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsEnum(['movie', 'show'], {
    message: `itemType should be among movie or show`,
  })
  @IsNotEmpty()
  itemType: 'movie' | 'show';

  @IsString()
  @IsEnum(GenreEnum, {
    message: `genre should be among ${GenreEnum}`,
  })
  @IsNotEmpty()
  genre: string;
}
