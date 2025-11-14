import { useState } from 'react';
import type { CreateAuthorDto } from '../../../../nest-api/src/modules/authors/author.dto';
import { Button, Input, Modal, message, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { AuthorModel } from '../AuthorModel';

interface CreateAuthorModalProps {
  serverUrl: string;
  onCreate: (author: AuthorModel) => void;
}

export function CreateAuthorModal({ serverUrl, onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CreateAuthorDto>({
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setFormData({ firstName: '', lastName: ''});
    setIsOpen(false);
  };


  const onSubmit = async () => {
    if (!formData.firstName || !formData.lastName) {
      message.error('Le prénom et le nom sont obligatoires.');
      return;
    }

    const endpoint = `${serverUrl}/authors`;
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

      const createdAuthor: AuthorModel = await response.json();
      onCreate(createdAuthor);
      message.success('Auteur créé avec succès !');
      onClose();
    } catch (err: any) {
      message.error(`Erreur lors de la création : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  
  const okDisabled =
    !formData.firstName ||
    !formData.lastName;

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        onClick={() => setIsOpen(true)}
      >
        Create a new author
      </Button>

      <Modal
        open={isOpen}
        title="Create a new author"
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
        </Form>
      </Modal>
    </>
  );
}
