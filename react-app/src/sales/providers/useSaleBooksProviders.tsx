import { useState } from 'react'
import axios from 'axios'
import type { BookModel } from '../../books/BookModel' // adapte le chemin

export const useSaleBooksProviders = () => {
  const [books, setBooks] = useState<BookModel[]>([]) // <-- Typage explicite

  const loadBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books')

      if (response.data && Array.isArray(response.data.data)) {
        setBooks(response.data.data as BookModel[]) // <-- assertion de type
      } else {
        setBooks([])
      }
    } catch (err) {
      setBooks([])
    }
  }

  return { books, loadBooks }
}
