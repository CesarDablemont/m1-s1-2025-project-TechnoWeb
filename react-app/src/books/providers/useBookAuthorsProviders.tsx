import { useState } from 'react'
import axios from 'axios'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState([])

  const loadAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:3000/authors')
      console.log('Réponse API auteurs:', response.data)

      // ton API renvoie { data: [...], totalCount: number }
      if (response.data && Array.isArray(response.data.data)) {
        setAuthors(response.data.data)
      } else {
        console.warn('Format inattendu:', response.data)
        setAuthors([])
      }
    } catch (err) {
      console.error('Erreur lors du chargement des auteurs:', err)
      setAuthors([])
    }
  }

  return { authors, loadAuthors }
}
