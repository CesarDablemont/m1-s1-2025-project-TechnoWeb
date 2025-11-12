import { useEffect, useState } from 'react';
import { useClientProvider } from '../providers/useClientProvider';
import { ClientListItem } from './ClientListItem';
import { CreateClientModal } from './CreateClientModal';
import type { CreateClientModel, ClientModel } from '../ClientModel';

export function ClientList() {
  const { clients = [], loadClients, deleteClient, updateClient, createClient } =
    useClientProvider();

  const [newClient, setNewClient] = useState<CreateClientModel>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: '',
  });

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Création rapide (optionnelle)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Appel de la fonction createClient du provider
    // Le serveur peut générer l'ID
    await createClient(newClient as ClientModel);

    // Reset du formulaire
    setNewClient({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      photoUrl: '',
    });
  };

  // Fonction pour passer au modal
  const handleCreateFromModal = (client: ClientModel) => {
    // Ajoute directement le client dans le state si nécessaire
    // ou laisse le provider gérer le rafraîchissement via loadClients
    createClient(client);
  };

  return (
    <>
      {/* Modal création avancée */}
      <CreateClientModal
        serverUrl="http://localhost:3000"
        onCreate={handleCreateFromModal}
      />

      

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
  );
}
