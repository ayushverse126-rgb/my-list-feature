import { BadRequestException } from "@nestjs/common";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class FetchListDTO {
  @IsNumber()
  @IsOptional()
  @Transform((value) => {
    if (isNaN(+value.obj.limit))
      throw new BadRequestException("limit should be a number");
    else return +value.obj.limit;
  })
  limit?: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform((value) => {
    if (isNaN(+value.obj.offset))
      throw new BadRequestException("offset should be a number");
    else return +value.obj.offset;
  })
  offset?: number = 0;
}
