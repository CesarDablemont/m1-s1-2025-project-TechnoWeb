import { useEffect } from 'react'
import { useSaleProvider } from '../providers/useSaleProvider'
import { SaleListItems } from './SaleListItems'
import { CreateSaleModal } from './CreateSaleModal'

export function SaleList() {
  const { sales, loadSales, deleteSale, createSale } =
    useSaleProvider()

  useEffect(() => {
    loadSales()
  }, [])

  return (
    <>
      <CreateSaleModal onCreate={createSale} />
      <div style={{ padding: '0 .5rem' }}>
        {sales.map(sale => (
          <SaleListItems
            key={sale.id}
            sale={sale}
            onDelete={deleteSale}
          />
        ))}
      </div>
    </>
  )
}
