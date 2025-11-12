import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Button, Col, Row, Input, Avatar } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({ client, onDelete, onUpdate }: ClientListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(client.firstName)
  const [lastName, setLastName] = useState(client.lastName)
  const [email, setEmail] = useState(client.email)
  const [photoUrl, setPhotoUrl] = useState(client.photoUrl)

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email)
    setPhotoUrl(client.photoUrl)
  }

  const onValidateEdit = () => {
    onUpdate(client.id, { firstName, lastName, email, photoUrl })
    setIsEditing(false)
  }

  return (
    <Row
      style={{
        width: '100%',
        minHeight: '80px',
        borderRadius: '10px',
        backgroundColor: '#F8F9FA',
        margin: '0.5rem 0',
        padding: '.75rem',
        alignItems: 'center',
      }}
    >
      {/* Avatar du client */}
      <Col span={3} style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar src={client.photoUrl} alt={`${client.firstName} ${client.lastName}`} />
      </Col>

      {/* Informations principales */}
      <Col span={15}>
        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <Input
              value={firstName}
              placeholder="Prénom"
              onChange={e => setFirstName(e.target.value)}
            />
            <Input
              value={lastName}
              placeholder="Nom"
              onChange={e => setLastName(e.target.value)}
            />
            <Input
              value={email}
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              value={photoUrl}
              placeholder="Photo URL"
              onChange={e => setPhotoUrl(e.target.value)}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {client.firstName} {client.lastName}
            </span>
            <span style={{ color: '#555' }}>{client.email}</span>
          </div>
        )}
      </Col>

      {/* Actions */}
      <Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '.5rem',
        }}
      >
        {isEditing ? (
          <>
            <Button type="primary" onClick={onValidateEdit}>
              <CheckOutlined />
            </Button>
            <Button onClick={onCancelEdit}>
              <CloseOutlined />
            </Button>
          </>
        ) : (
          <Button type="default" onClick={() => setIsEditing(true)}>
            <EditOutlined />
          </Button>
        )}
        <Button type="primary" danger onClick={() => onDelete(client.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
