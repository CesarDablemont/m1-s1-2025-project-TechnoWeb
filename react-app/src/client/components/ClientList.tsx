import { useEffect, useState } from 'react'
import { useClientProvider } from '../providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'
import type { CreateClientModel } from '../ClientModel'

export function ClientList() {
  const { clients = [], loadClients, deleteClient, updateClient, createClient } =
    useClientProvider() // fallback à [] si undefined

  const [newClient, setNewClient] = useState<CreateClientModel>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
  })

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewClient(prev => ({ ...prev, [name]: value }))
  }

  const handleCreate = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      alert('Veuillez remplir tous les champs obligatoires.')
      return
    }

    createClient({
      ...newClient,
      id: crypto.randomUUID(),
    })

    setNewClient({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      photoUrl: '',
    })
  }

  return (
    <>

      {/* Modal création avancée */}
      <CreateClientModal onCreate={createClient} />

      {/* Formulaire de création rapide */}
      

      {/* Liste des clients */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {clients.length > 0 ? (
          clients.map(client => (
            <ClientListItem
              key={client.id}
              client={client}
              onDelete={deleteClient}
              onUpdate={updateClient}
            />
          ))
        ) : (
          <li>Aucun client trouvé</li>
        )}
      </ul>
  
    </>
  )
}
