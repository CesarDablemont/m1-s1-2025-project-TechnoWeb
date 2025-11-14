import { Col, Row } from "antd"
import { DeleteBookModal } from "./DeleteBookModal"
import { useNavigate } from "@tanstack/react-router"
import type { BookModel, UpdateBookModel } from "../BookModel"

interface BookListItemProps {
  book: BookModel
  onDelete?: (id: string) => void
  onUpdate?: (id: string, input: UpdateBookModel) => void
  showDelete?: boolean
}

export function BookListItem({ book, onDelete, showDelete = true }: BookListItemProps) {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate({
      to: '/books/$bookId',
      params: { bookId: book.id },
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
      <Col span={15} style={{ paddingLeft: '1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontWeight: 'bold', fontSize: '1rem', color: 'white' }}>
            {book.title}
          </span>
          <span style={{ color: '#aaa' }}>({book.yearPublished})</span>
          <span style={{ color: '#ccc' }}> by {book.author.firstName} {book.author.lastName} </span>
        </div>
      </Col>

      {showDelete && onDelete && (
        <Col
          span={9}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '.5rem',
            paddingRight: '1rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <DeleteBookModal book={book} onDelete={onDelete} />
        </Col>
      )}
    </Row>
  )
}
