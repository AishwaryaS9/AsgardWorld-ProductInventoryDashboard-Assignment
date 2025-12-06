export type Category = 'electronics' | 'furniture' | 'stationery'

export interface Product {
    id: string
    name: string
    sku: string
    price: number
    quantity: number
    category: Category
}