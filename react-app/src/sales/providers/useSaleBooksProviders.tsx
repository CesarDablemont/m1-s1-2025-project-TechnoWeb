import { useState } from 'react'
import axios from 'axios'

export const useSaleBooksProviders = () => {
  const [books, setBooks] = useState([])

  const loadBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/books')
 
      if (response.data && Array.isArray(response.data.data)) {
        setBooks(response.data.data)
      } else {
        setBooks([])
      }
    } catch (err) {
      setBooks([])
    }
  }

  return { books, loadBooks }
}
