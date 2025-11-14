import { Outlet } from '@tanstack/react-router'
import { SaleList } from '../components/SaleList'

export function SalesPage() {
  return (
    <div style={{color : '#FFFFFF'}}>
      <h1>List of Sales</h1>
      <SaleList />
      <Outlet />
    </div>
  )
}