import type { BookModel } from "../books/BookModel";
import type { ClientModel } from "../clients/ClientModel";

export type SaleModel = {
  id: string;
  book: BookModel;
  client: ClientModel;
  saleDate: Date;
};


export type CreateSaleModel = {
    bookId : string
    clientId : string
}