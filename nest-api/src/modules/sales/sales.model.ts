import { BookModel } from "../books/book.model";

export type SaleModel = {
  id: string;
  bookId: string;
  book: BookModel;
  clientId: string;
  saleDate: Date;
};

export type CreateSaleModel = {
  bookId: string;
  clientId: string;
};

export type FilterSalesModel = {
  limit: number;
  offset: number;
  sort?: Partial<Record<keyof SaleModel, "ASC" | "DESC">>;
};

export type GetSalesModel = {
  data: SaleModel[];
};
