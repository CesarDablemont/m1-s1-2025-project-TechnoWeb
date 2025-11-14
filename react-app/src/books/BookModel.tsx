import type { AuthorModel } from "../authors/AuthorModel"


export type BookModel = {
  id: string
  title: string
  author: AuthorModel
  yearPublished: number
}

export type CreateBookModel = {
  title: string
  yearPublished: number,
  authorId: string
}

export type UpdateBookModel = Partial<CreateBookModel>


