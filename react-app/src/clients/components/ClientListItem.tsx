import type { ClientModel, UpdateClientModel } from '../ClientModel'
import { Col, Row, Avatar } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { DeleteClientModal } from './DeleteClientModal'

interface ClientListItemProps {
  client: ClientModel
  onDelete?: (id: string) => void
  onUpdate?: (id: string, input: UpdateClientModel) => void
  showDelete?: boolean
}

export function ClientListItem({ 
  client, 
  onDelete,
  showDelete = true,

 }: ClientListItemProps) {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate({
      to: '/clients/$clientId',
      params: { clientId: client.id },
    })
  }

  return (
    <Row
      onClick={handleRowClick}
      style={{
        minHeight: '80px',
        borderRadius: '10px',
        backgroundColor: '#393E46',
        margin: '0.5rem 0.5rem',
        padding: '.75rem',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Col span={3} style={{ display: 'flex', justifyContent: 'center', paddingLeft: '1rem' }}>
        <Avatar src={client.photoUrl} alt={``} />
      </Col>

      <Col span={15}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>
            {client.firstName} {client.lastName}
          </span>
          <span style={{ color: '#ccc' }}>{client.email}</span>
          <span style={{ color: '#aaa' }}>Books purchased : {client.salesCount}</span>
        </div>
      </Col>

    {showDelete && onDelete && (
       <Col
        span={6}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '.5rem',
          paddingRight: '1rem',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <DeleteClientModal client={client} onDelete={onDelete} />
      </Col>
    )}
    </Row>
  )
}
