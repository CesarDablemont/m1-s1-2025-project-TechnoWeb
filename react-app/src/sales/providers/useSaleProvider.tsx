import { useState } from 'react'
import type { SaleModel, CreateSaleModel } from '../SaleModel'
import axios from 'axios'

export const useSaleProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([])

  const loadSales = () => {
    axios
      .get('http://localhost:3000/sales')
      .then(data => {
        setSales(data.data.data)
      })
      .catch(err => console.error(err))
  }

  const loadSalesWithClientId = (clientId: string) => {
    axios
      .get('http://localhost:3000/sales')
      .then(response => {
        const allSales: SaleModel[] = response.data.data;
        const clientSales = allSales.filter(sale => sale.client.id === clientId);

        setSales(clientSales);
      })
      .catch(err => console.error(err));
  }

  const createSale = (sale: CreateSaleModel) => {
    axios
      .post('http://localhost:3000/sales', sale)
      .then(() => {
        loadSales()
      })
      .catch(err => console.error(err))
  }

  const deleteSale = (id: string) => {
    axios
      .delete(`http://localhost:3000/sales/${id}`)
      .then(() => {
        loadSales()
      })
      .catch(err => console.error(err))
  }

  return { sales, loadSales, createSale, deleteSale, loadSalesWithClientId }
}
