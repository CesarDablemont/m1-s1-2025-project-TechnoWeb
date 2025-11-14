import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography, Row, Col, Input, Button, Divider, InputNumber, Select } from 'antd'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import type { UpdateBookModel } from '../BookModel'
import { CreateSaleModal } from '../../sales/components/CreateSaleModal'
import { useSaleProvider } from '../../sales/providers/useSaleProvider'
import { useClientProvider } from '../../clients/providers/useClientProvider'
import { ClientListItem } from '../../clients/components/ClientListItem'
import { useAuthorProvider } from '../../authors/providers/useAuthorsProvider'
import type { AuthorModel } from '../../authors/AuthorModel'
interface BookDetailsProps {
  id: string
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export const BookDetails = ({ id, onUpdate }: BookDetailsProps) => {

  const { isLoading, book, loadBook } = useBookDetailsProvider(id);
  const { clients, loadClientsWithBookId } = useClientProvider();
  const { authors, loadAuthors } = useAuthorProvider();

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorModel | null>(book?.author ?? null)
  const [yearPublished, setYearPublished] = useState(0)

  const { loadSales, createSale } = useSaleProvider()

  useEffect(() => {
    loadBook()
    loadSales()
    loadClientsWithBookId(id)
    loadAuthors()
  }, [id])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setYearPublished(book.yearPublished)
      setSelectedAuthor(book.author)
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
      setSelectedAuthor(book.author)
    }
  }

  const onSave = async () => {
    if (!selectedAuthor) return
    onUpdate(book.id, { title, authorId: selectedAuthor.id, yearPublished })
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
                <Typography.Text style={{ color: 'white', width: 90 }}>Book's title : </Typography.Text>
                <Input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ width: 150 }}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 90 }}>Book's author : </Typography.Text>
                <Select
                value={book.author.id}
                  style={{ width: 200 }}
                  options={authors.map(author => ({
                    label: `${author.firstName} ${author.lastName}`,
                    value: author.id,
                  }))}
                  onChange={id => setSelectedAuthor(authors.find(a => a.id === id) ?? null)}
                />
              </Space>

              <Space direction="horizontal" style={{ color: 'white' }}>
                <Typography.Text style={{ color: 'white', width: 180 }}>
                  Year of book release:
                </Typography.Text>
                <InputNumber
                  value={yearPublished}
                  onChange={(value: number | null) => setYearPublished(value ?? 0)}
                  style={{ width: 200 }}
                />
              </Space>


            </>
          ) : (
            <>
              <Typography.Text style={{ color: 'white' }}>
                <strong>Book's title : </strong> {title}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>Book's author : </strong> {selectedAuthor?.firstName} {selectedAuthor?.lastName}
              </Typography.Text>

              <Typography.Text style={{ color: 'white' }}>
                <strong>Year of book release : </strong> {yearPublished}
              </Typography.Text>
            </>
          )}
        </Col>
        <Col flex="none" style={{marginRight: '0.75rem'}}>
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


      <Typography.Title level={4} style={{ color: 'white' }}>Clients who buy this book</Typography.Title>
      {clients.length > 0 ? (
        clients.map(client => (
          <ClientListItem
            key={client.id}
            client={client}
            showDelete={false}
            showBooksPurchased={false}
          />
        ))
      ) : (
        <li>No clients found</li>
      )}
    </Space>
  )
}