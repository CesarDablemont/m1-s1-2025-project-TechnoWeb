import { useState } from 'react';
import type { CreateClientDto } from '../../../../nest-api/src/modules/clients/clients.dto';
import { Button, Input, Modal, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ClientModel } from '../ClientModel';

interface CreateClientModalProps {
  serverUrl: string;
  onCreate: (client: ClientModel) => void; // on attend le client complet avec l'id
}

export function CreateClientModal({ serverUrl, onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateClientDto>({
    firstName: '',
    lastName: '',
    email: undefined,
    photoUrl: undefined,
  });
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setFormData({ firstName: '', lastName: '', email: undefined, photoUrl: undefined });
    setIsOpen(false);
  };

  const isEmailValid = (email?: string) => !email || /^\S+@\S+\.\S+$/.test(email);
  const isUrlValid = (url?: string) => !url || /^(https?:\/\/[^\s]+)$/.test(url);

  const onSubmit = async () => {
  if (!formData.firstName || !formData.lastName) {
    message.error('Le prénom et le nom sont obligatoires.');
    return;
  }

  const endpoint = `${serverUrl}/clients`;
  console.log('➡️ Endpoint appelé :', endpoint);
  try {
    setLoading(true);
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Erreur serveur');
    }

    const createdClient: ClientModel = await response.json();
    onCreate(createdClient); // mets à jour ClientList
    message.success('Client créé avec succès !');
    onClose();
  } catch (err: any) {
    message.error(`Erreur lors de la création : ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsOpen(true)}>
        Créer un client
      </Button>

      <Modal
        open={isOpen}
        title="Créer un nouveau client"
        onCancel={onClose}
        onOk={onSubmit}
        confirmLoading={loading}
        okButtonProps={{
          disabled:
            !formData.firstName ||
            !formData.lastName ||
            !isEmailValid(formData.email),
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Prénom"
            value={formData.firstName}
            onChange={e =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <Input
            placeholder="Nom"
            value={formData.lastName}
            onChange={e =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <Input
            placeholder="Email"
            value={formData.email ?? ''}
            onChange={e =>
              setFormData({ ...formData, email: e.target.value || undefined })
            }
          />
          <Input
            placeholder="URL de la photo"
            value={formData.photoUrl ?? ''}
            onChange={e =>
              setFormData({ ...formData, photoUrl: e.target.value || undefined })
            }
          />
        </Space>
      </Modal>
    </>
  );
}
