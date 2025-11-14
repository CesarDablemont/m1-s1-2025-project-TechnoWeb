import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as booksRoute } from './routes/books'
import { Route as clientRoute } from './routes/clients'
import { Route as authorRoute } from './routes/authors/author'
import { Route as saleRoute } from './routes/sales'
import { Space, type MenuProps } from 'antd'
import { BookOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={clientRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <InfoOutlined />,
    },
    {
      label: <Link to={authorRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <InfoOutlined />,
    },
    {
      label: <Link to={saleRoute.to}>Sales</Link>,
      key: 'sales',
      icon: <InfoOutlined />,
    },
  ]

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      <div>
        <Menu
          mode="horizontal"
          items={items}
          style={{
            display: 'flex',
            justifyContent : 'center',
            backgroundColor: '#948979',
            color: '#FFFFFF'
          }}
        />
      </div>
    
      <div style={{ width: '100%', overflowY: 'scroll' }}>{children}</div>
    </Space>
  )
}
