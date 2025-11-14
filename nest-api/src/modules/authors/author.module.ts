import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorController } from "./author.controller";
import { AuthorEntity } from "./author.entity";
import { BookEntity } from "../books/entities/book.entity";
import { SaleEntity } from "../sales/sales.entity";
import { AuthorRepository } from "./author.repository";
import { AuthorService } from "./author.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity])],
  controllers: [AuthorController],
  providers: [AuthorRepository, AuthorService],
})
export class AuthorModule {}
