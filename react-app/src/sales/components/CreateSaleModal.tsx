import { useEffect, useState } from 'react'
import type { CreateSaleModel } from '../SaleModel'
import { Button, Modal, Select, message, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSaleClientsProviders } from '../providers/useSaleClientsProviders'
import { useSaleBooksProviders } from '../providers/useSaleBooksProviders'

interface CreateSaleModalProps {
    onCreate: (Sale: CreateSaleModel) => void
}

export function CreateSaleModal({ onCreate }: CreateSaleModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [bookId, setBookId] = useState<string | undefined>(undefined)
    const [clientId, setClientId] = useState<string | undefined>(undefined)
    const { clients = [], loadClients } = useSaleClientsProviders()
    const { books = [], loadBooks } = useSaleBooksProviders()

    const onClose = () => {
        setBookId(undefined)
        setClientId(undefined)
        setIsOpen(false)
    }

    useEffect(() => {
        if (isOpen) {
            loadClients()
            loadBooks()
        }
    }, [isOpen])

    const onSubmit = () => {
        if (!bookId || !clientId) {
            message.error('Veuillez remplir tous les champs obligatoires.')
            return
        }

        onCreate({ bookId, clientId })
        message.success('Livre créé avec succès !')
        onClose()
    }

    const okDisabled = !bookId || !clientId

    return (
        <>
            <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => setIsOpen(true)}
                style={{ backgroundColor: '#FFFFFF', border: 'none', color: 'black' }}
            >
                Create Sale
            </Button>

            <Modal
                open={isOpen}
                title="Create a new Sale"
                onCancel={onClose}
                onOk={onSubmit}
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
                    <Form.Item label="Book" required>
                        <Select
                            style={{
                                width: '100%',
                                backgroundColor: '#393E46',
                                color: 'white',
                                border: '1px solid #222831',
                            }}
                            value={bookId}
                            placeholder="Select an book"
                            options={(Array.isArray(books) ? books : []).map(book => ({
                                label: `${book.title}`,
                                value: book.id,
                            }))}
                            onChange={value => setBookId(value)}
                        />
                    </Form.Item>

                    <Form.Item label="Client" required>
                        <Select
                            style={{
                                width: '100%',
                                backgroundColor: '#393E46',
                                color: 'white',
                                border: '1px solid #222831',
                            }}
                            value={clientId}
                            placeholder="Select an client"
                            options={(Array.isArray(clients) ? clients : []).map(client => ({
                                label: `${client.firstName} ${client.lastName}`,
                                value: client.id,
                            }))}
                            onChange={value => setClientId(value)}
                        />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    )
}