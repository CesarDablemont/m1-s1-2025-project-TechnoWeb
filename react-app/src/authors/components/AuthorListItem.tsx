import type { AuthorModel, UpdateAuthorModel } from '../AuthorModel'
import { Col, Row } from 'antd'
import { useNavigate } from '@tanstack/react-router'
import { DeleteAuthorModal } from './DeleteAuthorModal'

interface AuthorListItemProps {
  author: AuthorModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function AuthorListItem({ author, onDelete }: AuthorListItemProps) {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate({
      to: '/authors/$authorId', // utiliser la route importée
      params: { authorId: author.id }, // correspond exactement au param $authorId
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
      <Col span={18} style={{ paddingLeft: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>
            {author.firstName} {author.lastName}
          </span>
          <span style={{ color: '#aaa' }}>Sales count: {author.salesCount}</span>
        </div>
      </Col>

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
        <DeleteAuthorModal author={author} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
