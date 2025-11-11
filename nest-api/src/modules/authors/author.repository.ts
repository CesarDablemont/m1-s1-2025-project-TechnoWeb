import { Injectable } from "@nestjs/common";
import {
  AuthorModel,
  CreateAuthorModel,
  FilterAuthorModel,
} from "./author.model";
import { AuthorEntity, AuthorId } from "./author.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  public async getAllAuthors(
    input?: FilterAuthorModel,
  ): Promise<[AuthorModel[], number]> {
    const [authors, totalCount] = await this.authorRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });

    return [authors, totalCount];
  }

  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
    const author = await this.authorRepository.findOne({
      where: { id: id as AuthorId },
    });

    if (!author) {
      return undefined;
    }

    return {
      ...author,
    };
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }
}
