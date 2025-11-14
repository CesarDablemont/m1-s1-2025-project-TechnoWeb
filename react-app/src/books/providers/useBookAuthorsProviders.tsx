import { useState } from 'react'
import axios from 'axios'
import type { AuthorModel } from '../../authors/AuthorModel' // adapte le chemin

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([]) // <-- Typage explicite

  const loadAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/authors')

      if (response.data && Array.isArray(response.data.data)) {
        setAuthors(response.data.data as AuthorModel[]) // <-- assertion de type
      } else {
        setAuthors([])
      }
    } catch (err) {
      console.error(err)
      setAuthors([])
    }
  }

  return { authors, loadAuthors }
}
