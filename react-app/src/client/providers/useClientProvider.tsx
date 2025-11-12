import { useState } from 'react'
import type { ClientModel, CreateClientModel, UpdateClientModel } from '../ClientModel'
import axios from 'axios'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])

  const loadClients = () => {
    axios
      .get('http://localhost:5173/client')
      .then(data => {
        setClients(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const createClient = (clients: CreateClientModel) => {
    axios
      .post('http://localhost:5173/client', clients)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const updateClient = (id: string, input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:5173/client/${id}`, input)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  const deleteClient = (id: string) => {
    axios
      .delete(`http://localhost:5173/client/${id}`)
      .then(() => {
        loadClients()
      })
      .catch(err => console.error(err))
  }

  return {  clients, loadClients, deleteClient, updateClient, createClient }
}
