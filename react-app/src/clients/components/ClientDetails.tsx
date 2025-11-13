import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography, Avatar, Row, Col, Input, Button, Divider } from 'antd'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../routes/clients'
import type { UpdateClientModel } from '../ClientModel'

interface ClientDetailsProps {
  id: string
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export const ClientDetails = ({ id, onUpdate }: ClientDetailsProps) => {
  const { isLoading, client, loadClient } = useClientDetailsProvider(id)

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    loadClient()
  }, [id])

  useEffect(() => {
    if (client) {
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setEmail(client.email || '')
      setPhotoUrl(client.photoUrl || '')
    }
  }, [client])

  if (isLoading) return <Skeleton active />

  if (!client) {
    return <Typography.Text style={{ color: 'white' }}>Aucun client trouvé.</Typography.Text>
  }

  const onCancel = () => {
    setIsEditing(false)
    if (client) {
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setEmail(client.email || '')
      setPhotoUrl(client.photoUrl || '')
    }
  }

  const onSave = async () => {
    if (!firstName || !lastName) return
    onUpdate(client.id, { firstName, lastName, email, photoUrl })
    setIsEditing(false)
  }

  return (
    <Space
      direction="vertical"
      style={{
        width: '95%',
        color: 'white',
        padding: '1rem',
        backgroundColor: '#222831',
        borderRadius: '10px',
      }}
      size="large"
    >
      <Link
        to={clientsRoute.to}
        style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeftOutlined /> Retour à la liste
      </Link>

      <Row align="middle" style={{ width: '100%' }}>
        <Col flex="none">
          <Avatar size={80} src={photoUrl} alt={`${firstName} ${lastName}`} />
        </Col>

        <Col flex="auto" style={{ paddingLeft: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {isEditing ? (
            <>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: 120 }} />
              <Input value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: 120 }} />
              <Input value={email} onChange={e => setEmail(e.target.value)} style={{ width: 200 }} />
              <Input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} style={{ width: 200 }} />
            </>
          ) : (
            <>
              <Typography.Text strong>{firstName}</Typography.Text>
              <Typography.Text strong>{lastName}</Typography.Text>
              <Typography.Text>{email || '-'}</Typography.Text>
              <Typography.Text type="secondary">Sales: {client.salesCount || 0}</Typography.Text>
            </>
          )}
        </Col>

        <Col flex="none">
          {isEditing ? (
            <Space>
              <Button icon={<CheckOutlined />} type="primary" onClick={onSave} style={{ backgroundColor: '#948979', border: 'none' }} />
              <Button icon={<CloseOutlined />} onClick={onCancel} style={{ backgroundColor: '#555', border: 'none', color: 'white' }} />
            </Space>
          ) : (
            <Button onClick={() => setIsEditing(true)} style={{ backgroundColor: '#393E46', border: '1px solid #948979', color: 'white' }}>
              Edit
            </Button>
          )}
        </Col>
      </Row>

      <Divider style={{ borderColor: '#393E46' }} />

      {/* Liste des livres */}
      <Typography.Title level={4} style={{ color: 'white' }}>Books owned</Typography.Title>
    </Space>
  )
}
