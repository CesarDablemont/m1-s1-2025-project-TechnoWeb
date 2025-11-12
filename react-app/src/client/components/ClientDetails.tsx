import { Skeleton, Space, Typography, Avatar } from 'antd'
import { useClientDetailsProvider } from '../providers/useClientDetailsProvider'
import { useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../routes/client'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { isLoading, client, loadClient } = useClientDetailsProvider(id)

  useEffect(() => {
    loadClient()
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  if (!client) {
    return <Typography.Text>Aucun client trouvé.</Typography.Text>
  }

  return (
    <Space
      direction="vertical"
      style={{
        textAlign: 'left',
        width: '95%',
        alignItems: 'flex-start',
      }}
    >
      <Link to={clientsRoute.to}>
        <ArrowLeftOutlined /> Retour à la liste
      </Link>

      <Space align="center" size="large">
        <Avatar
          size={100}
          src={client.photoUrl}
          alt={`${client.firstName} ${client.lastName}`}
        />
        <div>
          <Typography.Title level={2}>
            {client.firstName} {client.lastName}
          </Typography.Title>
          <Typography.Text type="secondary">{client.email}</Typography.Text>
        </div>
      </Space>
    </Space>
  )
}
