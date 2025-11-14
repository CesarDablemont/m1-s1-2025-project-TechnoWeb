import { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { ClientModel } from '../ClientModel'

interface DeleteClientModalProps {
  client: ClientModel
  onDelete: (id: string) => void
}

export function DeleteClientModal({ client, onDelete }: DeleteClientModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      onDelete(client.id)
      message.success(`Client ${client.firstName} ${client.lastName} supprimé !`)
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
        title="Delete the client ?"
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
          Are you sure you want to delete <strong>{client.firstName} {client.lastName}</strong>? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
