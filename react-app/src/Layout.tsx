import { Link } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as aboutRoute } from './routes/about'
import { Route as booksRoute } from './routes/books'
import { Route as clientRoute } from './routes/client'
import { Route as authorRoute } from './routes/author'
import { Space, type MenuProps } from 'antd'
import { BookOutlined, HomeOutlined, InfoOutlined } from '@ant-design/icons'
import Menu from 'antd/es/menu/menu'
import { BottomPage } from './BottomPage'
import { SearchBar } from './SearchBar'


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
      label: <Link to={clientRoute.to}>Client</Link>,
      key: 'client',
      icon: <InfoOutlined />,
    },
    {
      label: <Link to={authorRoute.to}>Author</Link>,
      key: 'author',
      icon: <InfoOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
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
      <div style={{ width: '100%', backgroundColor: '#1f1f1f', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 16px' }}>
          <div style={{ width: '50%', maxWidth: 800 }}>
            <SearchBar
              books={[
                { id: 1, title: '1984' },
                { id: 2, title: 'Le Seigneur des Anneaux' },
                { id: 3, title: 'Fondation' },
                { id: 4, title: 'Dune' },
                { id: 5, title: 'Le Hobbit' },
              ]}
              authors={[
                { id: 1, name: 'George Orwell' },
                { id: 2, name: 'J.R.R. Tolkien' },
                { id: 3, name: 'Isaac Asimov' },
                { id: 4, name: 'Frank Herbert' },
              ]}
            />
          </div>
        </div>
      </div>
              
      <div>
        <Menu mode="horizontal" items={items} />
      </div>
    
      <div style={{ width: '100%', overflowY: 'scroll' }}>{children}</div>
      <BottomPage />
    </Space>
  )
}
