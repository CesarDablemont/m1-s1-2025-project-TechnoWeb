import type { SaleModel } from '../SaleModel'
import { Col, Row } from 'antd'
import { DeleteSaleModal } from './DeleteSaleModal'

interface SaleListItemsProps {
  sale: SaleModel
  onDelete: (id: string) => void
}

export function SaleListItems({ sale, onDelete }: SaleListItemsProps) {
  return (
    <Row
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
            color: 'white'
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            Title : <span style={{ color: '#ccc' }}>{sale.book.title}</span>
          </span>

          <span style={{ fontSize: '.9rem', color: '#aaa' }}>
            by {sale.book.author.firstName} {sale.book.author.lastName}
          </span>

          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            buy by : <span style={{ color: '#ccc' }}>{sale.client.firstName} {sale.client.lastName}</span>
          </span>
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
        <DeleteSaleModal sale={sale} onDelete={onDelete} />
      </Col>
    </Row>
  )
}
