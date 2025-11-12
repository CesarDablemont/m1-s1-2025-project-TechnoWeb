import { useState } from 'react'
import type { CreateClientModel } from '../ClientModel'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateClientModalProps {
  onCreate: (client: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhotoUrl('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Créer un client
      </Button>

      <Modal
        open={isOpen}
        title="Créer un nouveau client"
        onCancel={onClose}
        onOk={() => {
          onCreate({
            id: crypto.randomUUID(), // génère un id unique côté front
            firstName,
            lastName,
            email,
            photoUrl,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName || !lastName || !email,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Prénom"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Nom"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="URL de la photo"
            value={photoUrl}
            onChange={e => setPhotoUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
