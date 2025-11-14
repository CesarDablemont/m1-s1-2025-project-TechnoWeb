import { useAuthorDetailsProvider } from '../providers/useAuthorDetailsProviders'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography, Row, Col, Input, Button, Divider } from 'antd'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../routes/authors'
import type { UpdateAuthorModel } from '../AuthorModel'

interface AuthorDetailsProps {
  id: string
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export const AuthorDetails = ({ id, onUpdate }: AuthorDetailsProps) => {
  const { isLoading, author, loadAuthor } = useAuthorDetailsProvider(id)

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  useEffect(() => {
    loadAuthor()
  }, [id])

  useEffect(() => {
    if (author) {
      setFirstName(author.firstName)
      setLastName(author.lastName)
      }
  }, [author])

  if (isLoading) return <Skeleton active />

  if (!author) {
    return <Typography.Text style={{ color: 'white' }}>Aucun auteur trouvé.</Typography.Text>
  }

  const onCancel = () => {
    setIsEditing(false)
    if (author) {
      setFirstName(author.firstName)
      setLastName(author.lastName)
      
  }

  const onSave = async () => {
    if (!firstName || !lastName) return
    onUpdate(author.id, { firstName, lastName })
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
        to={authorsRoute.to}
        style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeftOutlined /> Retour à la liste
      </Link>

      <Row align="middle" style={{ width: '100%' }}>
       

        <Col flex="auto" style={{ paddingLeft: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {isEditing ? (
            <>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} style={{ width: 120 }} />
              <Input value={lastName} onChange={e => setLastName(e.target.value)} style={{ width: 120 }} />
              </>
          ) : (
            <>
              <Typography.Text strong>{firstName}</Typography.Text>
              <Typography.Text strong>{lastName}</Typography.Text>
              
              <Typography.Text type="secondary">Sales: {author.salesCount || 0}</Typography.Text>
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

      <Typography.Title level={4} style={{ color: 'white' }}>Books owned</Typography.Title>
    </Space>
  )
}
}
