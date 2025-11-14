import { useState } from 'react'
import { Button, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { SaleModel } from '../SaleModel'

interface DeleteSaleModalProps {
  sale: SaleModel
  onDelete: (id: string) => void
}

export function DeleteSaleModal({ sale, onDelete }: DeleteSaleModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleConfirmDelete = async () => {
    try {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      onDelete(sale.id)
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
        title="Delete the sale ?"
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
          Are you sure you want to delete this sale ? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}
