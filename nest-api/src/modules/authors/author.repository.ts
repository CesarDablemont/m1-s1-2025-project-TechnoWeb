import { Injectable } from "@nestjs/common";
import {
  AuthorModel,
  CreateAuthorModel,
  FilterAuthorModel,
  UpdateAuthorModel,
} from "./author.model";
import { AuthorEntity, AuthorId } from "./author.entity";
import { BookEntity } from "../books/entities/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { SaleEntity } from "../sales/sales.entity";

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
  ) {}

  public async getAllAuthors(
    input?: FilterAuthorModel,
  ): Promise<[AuthorModel[], number]> {
    const [authors, totalCount] = await this.authorRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });

    const counts = await Promise.all(
      authors.map((a) =>
        this.bookRepository.count({
          where: { authorId: a.id },
        }),
      ),
    );

    const authorsWithCount: AuthorModel[] = authors.map((a, i) => ({
      ...a,
      booksCount: counts[i] ?? 0,
    }));

    return [authorsWithCount, totalCount];
  }

  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
    const author = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!author) {
      return undefined;
    }
    const booksCount = await this.bookRepository.count({
      where: { authorId: author.id },
    });

    const books = await this.bookRepository.find({
      where: { authorId: author.id },
      select: ["id", "title", "yearPublished"],
    });

    const booksSummary = books.map((b) => ({
      id: b.id,
      title: b.title,
      yearPublished: b.yearPublished,
    }));

    const bookIds = books.map((b) => b.id);
    const totalSales = bookIds.length
      ? await this.saleRepository.count({
          where: { bookId: In(bookIds) },
        })
      : 0;

    const averageSales = booksCount > 0 ? totalSales / booksCount : 0;

    return {
      ...author,
      booksCount,
      books: booksSummary,
      averageSales,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    const saved = await this.authorRepository.save(
      this.authorRepository.create(author),
    );

    return {
      ...saved,
      booksCount: 0,
    };
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | undefined> {
    const oldAuthor = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!oldAuthor) {
      return undefined;
    }

    await this.authorRepository.update(id, author);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
