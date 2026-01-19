import { IsInt, IsOptional } from "class-validator";

export class GetUsersDto {
  @IsOptional()
  filter?: string;
  @IsInt()
  @IsOptional()
  page?: string;
  @IsInt()
  @IsOptional()
  limit?: string;
}
