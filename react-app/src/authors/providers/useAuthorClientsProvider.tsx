import { useState } from 'react'
import type { AuthorModel } from '../AuthorModel'
import axios from 'axios'

export const useAuthorContactsProvider = () => {
  const [contacts, setContacts] = useState<AuthorModel[]>([])

  const loadContacts = () => {
    axios
      .get('http://localhost:5713/contacts')
      .then(response => {
        setContacts(response.data)
      })
      .catch(error => {
        console.error('Erreur lors du chargement des contacts :', error)
      })
  }

  return { contacts, loadContacts }
}
