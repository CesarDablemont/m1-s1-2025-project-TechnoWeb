import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, message, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => void
}

export function CreateBookModal({ onCreate }: CreateBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [yearPublished, setYearPublished] = useState<number | undefined>(undefined)
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = () => {
    setTitle('')
    setYearPublished(undefined)
    setAuthorId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen])

  const onSubmit = () => {
    if (!title || !yearPublished || !authorId) {
      message.error('Veuillez remplir tous les champs obligatoires.')
      return
    }

    onCreate({ title, yearPublished, authorId })
    message.success('Livre créé avec succès !')
    onClose()
  }

  const okDisabled = !title || !yearPublished || !authorId

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
        style={{ backgroundColor: '#FFFFFF', border: 'none', color: 'black' }}
      >
        Create Book
      </Button>

      <Modal
        open={isOpen}
        title="Create a new book"
        onCancel={onClose}
        onOk={onSubmit}
        confirmLoading={false}
        okButtonProps={{
          disabled: okDisabled,
          style: {
            backgroundColor: okDisabled ? '#555' : '#948979',
            color: 'white',
            border: 'none',
          },
        }}
        cancelButtonProps={{
          style: { color: 'black', border: 'none' },
        }}
        style={{ color: 'white' }}
        centered
      >
        <Form layout="vertical" style={{ color: 'white' }}>
          <Form.Item label="Title" required>
            <Input
              placeholder="Enter book title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                backgroundColor: '#393E46',
                color: 'white',
                border: '1px solid #222831',
              }}
            />
          </Form.Item>

          <Form.Item label="Author" required>
            <Select
              style={{
                width: '100%',
                backgroundColor: '#393E46',
                color: 'white',
                border: '1px solid #222831',
              }}
              value={authorId}
              placeholder="Select an author"
              options={authors.map(a => ({
                label: `${a.firstName} ${a.lastName}`,
                value: a.id,
              }))}
              onChange={value => setAuthorId(value)}
            />
          </Form.Item>

          <Form.Item label="Year Published" required>
            <Input
              type="number"
              placeholder="Enter year"
              value={yearPublished ?? ''}
              onChange={e => setYearPublished(Number(e.target.value))}
              style={{
                backgroundColor: '#393E46',
                color: 'white',
                border: '1px solid #222831',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
