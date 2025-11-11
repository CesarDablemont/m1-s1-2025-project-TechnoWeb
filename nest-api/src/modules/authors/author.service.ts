import { Injectable } from "@nestjs/common";
import {
  AuthorModel,
  CreateAuthorModel,
  FilterAuthorModel,
} from "./author.model";
import { AuthorRepository } from "./author.repository";

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(
    input?: FilterAuthorModel,
  ): Promise<[AuthorModel[], number]> {
    return this.authorRepository.getAllAuthors(input);
  }

  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }
}
