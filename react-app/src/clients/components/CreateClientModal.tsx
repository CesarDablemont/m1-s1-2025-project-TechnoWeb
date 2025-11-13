import { useState } from 'react';
import type { CreateClientDto } from '../../../../nest-api/src/modules/clients/clients.dto';
import { Button, Input, Modal, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ClientModel } from '../ClientModel';

interface CreateClientModalProps {
  serverUrl: string;
  onCreate: (client: ClientModel) => void;
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
      onCreate(createdClient);
      message.success('Client créé avec succès !');
      onClose();
    } catch (err: any) {
      message.error(`Erreur lors de la création : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const emailError = formData.email && !isEmailValid(formData.email);
  const urlError = formData.photoUrl && !isUrlValid(formData.photoUrl);

  const okDisabled =
    !formData.firstName ||
    !formData.lastName ||
    !!emailError ||
    !!urlError;

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Create a new client
      </Button>

      <Modal
        open={isOpen}
        title="Create a new client"
        onCancel={onClose}
        onOk={onSubmit}
        confirmLoading={loading}
        okButtonProps={{
          disabled: okDisabled,
          style: {
            backgroundColor: okDisabled ? '#555' : '#948979',
            color: 'white',
            border: 'none',
          },
        }}
        styles={{
          body: { backgroundColor: '#222831' },
          header: { backgroundColor: '#393E46', color: 'white' },
          footer: { backgroundColor: '#393E46' },
          mask: { backgroundColor: 'rgba(0,0,0,0.75)' },
        }}
      >
        <Form layout="vertical" style={{ color: 'white' }}>
          <Form.Item label="Firstname" required>
            <Input
              style={{
                backgroundColor: '#393E46',
                color: '#FFFFFF',
                border: '1px solid #222831',
              }}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={e =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Lastname" required>
            <Input
              style={{
                backgroundColor: '#393E46',
                color: '#FFFFFF',
                border: '1px solid #222831',
              }}
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={e =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            label="Email"
            validateStatus={emailError ? 'error' : ''}
            help={emailError ? 'Adresse e-mail invalide.' : ''}
          >
            <Input
              style={{
                backgroundColor: '#393E46',
                color: '#FFFFFF',
                border: emailError ? '1px solid #ff4d4f' : '1px solid #222831',
              }}
              placeholder="Enter email (optional)"
              value={formData.email ?? ''}
              onChange={e =>
                setFormData({ ...formData, email: e.target.value || undefined })
              }
            />
          </Form.Item>

          <Form.Item
            label="Photo URL"
            validateStatus={urlError ? 'error' : ''}
            help={urlError ? "URL invalide (doit commencer par http ou https)." : ''}
          >
            <Input
              style={{
                backgroundColor: '#393E46',
                color: '#FFFFFF',
                border: urlError ? '1px solid #ff4d4f' : '1px solid #222831',
              }}
              placeholder="Enter photo URL (optional)"
              value={formData.photoUrl ?? ''}
              onChange={e =>
                setFormData({ ...formData, photoUrl: e.target.value || undefined })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
