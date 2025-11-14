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
        <ArrowLeftOutlined /> Go back
      </Link>

      <Row align="middle" style={{ width: '100%' }}>
        <Col flex="none">
          <Avatar size={80} src={photoUrl} />
        </Col>

        <Col
          flex="auto"
          style={{
            paddingLeft: '1rem',
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            color: "white",
            flexWrap: "wrap",
          }}
        >
          {isEditing ? (
            <>
              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Lastname :</Typography.Text>
                <Input
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  style={{ width: 150 }}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Firstname :</Typography.Text>
                <Input
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  style={{ width: 150 }}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Email :</Typography.Text>
                <Input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: 200 }}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Photo URL :</Typography.Text>
                <Input
                  value={photoUrl}
                  onChange={e => setPhotoUrl(e.target.value)}
                  style={{ width: 250 }}
                />
              </Space>
            </>
          ) : (
            <>
              <Typography.Text style={{ color: 'white' }}>
                <strong>Lastname :</strong> {lastName}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>- Firstname :</strong> {firstName}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>- Email :</strong> {email || '-'}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>- Books purchased :</strong> {client.salesCount || 0}
              </Typography.Text>
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
