import { useState } from 'react'
import type { ClientModel } from '../ClientModel'
import axios from 'axios'

export const useClientContactsProvider = () => {
  const [contacts, setContacts] = useState<ClientModel[]>([])

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
