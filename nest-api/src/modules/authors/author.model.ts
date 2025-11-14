import { AuthorId } from "./author.entity";

export type AuthorBookModel = {
  id: string;
  title: string;
  yearPublished: number;
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  booksCount: number;
  books?: AuthorBookModel[];
  averageSales?: number;
};

export type CreateAuthorModel = {
  firstName: string;
  lastName: string;
};

export type UpdateAuthorModel = Partial<CreateAuthorModel>;

export type FilterAuthorModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof AuthorModel, "ASC" | "DESC">>;
};

export type GetAuthorModel = {
  totalCount: number;
  data: AuthorModel[];
};
