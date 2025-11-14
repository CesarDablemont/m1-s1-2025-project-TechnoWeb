import { IsOptional, IsString, IsUUID, Min, IsInt } from "class-validator";
import type { BookId } from "../books/entities/book.entity";
import type { ClientId } from "../clients/entities/client.entity";

export class CreateSaleDto {
    @IsUUID(4)
    @IsString()
    clientId: ClientId;

    @IsString()
    bookId: BookId;
}

export class GetSalesDto {
  @IsInt()
  @Min(1)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}
