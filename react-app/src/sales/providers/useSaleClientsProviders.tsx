import { useState } from 'react'
import axios from 'axios'

export const useSaleClientsProviders = () => {
  const [clients, setClients] = useState([])

  const loadClients = async () => {
    try {
      const response = await axios.get('http://localhost:3000/clients')
 
      if (response.data && Array.isArray(response.data.data)) {
        setClients(response.data.data)
      } else {
        setClients([])
      }
    } catch (err) {
      setClients([])
    }
  }

  return { clients, loadClients }
}
