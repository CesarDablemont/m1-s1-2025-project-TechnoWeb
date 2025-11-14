import { useState } from 'react'
import axios from 'axios'
import type { ClientModel } from '../../clients/ClientModel' 

export const useSaleClientsProviders = () => {
  const [clients, setClients] = useState<ClientModel[]>([]) 

  const loadClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clients')

      if (response.data && Array.isArray(response.data.data)) {
        setClients(response.data.data as ClientModel[]) 
      } else {
        setClients([])
      }
    } catch (err) {
      setClients([])
    }
  }

  return { clients, loadClients }
}
