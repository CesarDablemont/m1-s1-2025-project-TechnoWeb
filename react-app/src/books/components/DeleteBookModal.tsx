import { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { BookModel } from '../BookModel'

interface DeleteBookModalProps {
  book: BookModel
  onDelete: (id: string) => void
}

export function DeleteBookModal({ book, onDelete }: DeleteBookModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)  
      onDelete(book.id)
      message.success(`Livre "${book.title}" supprimé !`)
      closeModal()
    } catch (err: any) {
      message.error(`Erreur lors de la suppression : ${err.message || err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        style={{ backgroundColor: '#E74C3C', color: 'white', border: 'none' }}
        onClick={openModal}
      >
      </Button>

      <Modal
        open={isOpen}
        title="Delete this book ?"
        onCancel={closeModal}
        onOk={handleConfirmDelete}
        confirmLoading={loading}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        centered
        style={{ color: 'white' }}
      >
        <p>
         Are you sure you want to delete <strong>{book.title}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
