import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography, Avatar, Row, Col, Input, Button, Divider } from 'antd'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import type { UpdateBookModel } from '../BookModel'
import { CreateSaleModal } from '../../sales/components/CreateSaleModal'
import { useSaleProvider } from '../../sales/providers/useSaleProvider'
interface BookDetailsProps {
  id: string
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export const BookDetails = ({ id, onUpdate }: BookDetailsProps) => {
 

  const { isLoading, book, loadBook } = useBookDetailsProvider(id)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthors] = useState('')
  
  const { loadSales,createSale } = useSaleProvider()
    useEffect(() => {
      loadSales()
    }, [])

  
  useEffect(() => {
    loadBook()
  }, [id])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setAuthors(book.author.firstName + ' ' + book.author.lastName)
    }
  }, [book])

  if (isLoading) return <Skeleton active />

  if (!book) {
    return <Typography.Text style={{ color: 'white' }}> Book not found.</Typography.Text>
  }

  const onCancel = () => {
    setIsEditing(false)
    if (book) {
      setTitle(book.title)
      setAuthors(book.author.firstName + ' ' + book.author.lastName)
      
      
    }
  }

  const onSave = async () => {
    if (!title) return
    onUpdate(book.id, { title, authorId: book.author.id })
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
        to={booksRoute.to}
        style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <ArrowLeftOutlined /> Go back
      </Link>

      <Row align="middle" style={{ width: '100%' }}>
        
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
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: 150 }}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Email :</Typography.Text>
                <Input
                  value={author}
                  onChange={e => setAuthors(e.target.value)}
                  style={{ width: 200 }}
                />
              </Space>

            </>
          ) : (
            <>
              <Typography.Text style={{ color: 'white' }}>
                <strong>Lastname :</strong> {title}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>- Firstname :</strong> {author}
              </Typography.Text>

            </>
          )}
        </Col>
        <Col flex="none">
          <CreateSaleModal 
            onCreate={createSale} 
            defaultBookId={book.id}
          />
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

      
      <Typography.Title level={4} style={{ color: 'white' }}>Any books</Typography.Title>
    </Space>
  )
}