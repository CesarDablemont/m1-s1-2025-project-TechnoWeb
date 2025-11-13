export type BookModel = {
  id: string
  title: string
  author: {
    id: string
    firstName: string
    lastName: string
  }
  yearPublished: number
}

export type CreateBookModel = {
  title: string
  yearPublished: number,
  authorId: string
}

export type UpdateBookModel = Partial<CreateBookModel>


