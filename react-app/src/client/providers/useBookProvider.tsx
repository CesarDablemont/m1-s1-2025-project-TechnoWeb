import { useState } from 'react'
import type { ClientModel, CreateClientModel, UpdateBookModel } from '../ClientModel'
import axios from 'axios'

export const useBookProvider = () => {
  const [books, setBooks] = useState<ClientModel[]>([])

  const loadBooks = () => {
    axios
      .get('http://localhost:3000/client')
      .then(data => {
        setBooks(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createBook = (book: CreateClientModel) => {
    axios
      .post('http://localhost:3000/client', book)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const updateBook = (id: string, input: UpdateBookModel) => {
    axios
      .patch(`http://localhost:3000/books/${id}`, input)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  const deleteBook = (id: string) => {
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        loadBooks()
      })
      .catch(err => console.error(err))
  }

  return { books, loadBooks, createBook, updateBook, deleteBook }
}
