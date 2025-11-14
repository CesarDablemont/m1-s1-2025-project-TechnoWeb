import { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { AuthorModel } from '../AuthorModel'

interface DeleteAuthorModalProps {
  author: AuthorModel
  onDelete: (id: string) => void
}

export function DeleteAuthorModal({ author, onDelete }: DeleteAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      onDelete(author.id)
      message.success(`Author ${author.firstName} ${author.lastName} deleted!`)
      closeModal()
    } catch (err: any) {
      message.error(`Error deleting: ${err.message || err}`)
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
        title="Delete the author?"
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
          Are you sure you want to delete <strong>{author.firstName} {author.lastName}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
