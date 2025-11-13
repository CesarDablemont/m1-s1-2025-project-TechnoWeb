import { useEffect } from 'react';
import { useClientProvider } from '../providers/useClientProvider';
import { ClientListItem } from './ClientListItem';
import { CreateClientModal } from './CreateClientModal';
import type { ClientModel } from '../ClientModel';

export function ClientList() {
  const { clients = [], loadClients, deleteClient, updateClient, createClient } =
    useClientProvider();

  useEffect(() => {
    loadClients();
  }, [loadClients]);


  const handleCreateFromModal = (client: ClientModel) => {
    createClient(client);
  };

  return (
    <>
      <CreateClientModal
        serverUrl="http://localhost:3000"
        onCreate={handleCreateFromModal}
      />

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
