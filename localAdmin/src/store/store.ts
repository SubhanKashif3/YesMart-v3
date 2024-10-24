import { create } from 'zustand'

// Define the types for our store
type Product = {
  id: string
  name: string
  price: number
  // Add other product properties as needed
}

type Order = {
  id: string
  customerId: string
  products: Product[]
  total: number
  // Add other order properties as needed
}

// Define the store state
interface AdminState {
  isLoggedIn: boolean
  products: Product[]
  orders: Order[]
  // Actions
  setLoggedIn: (status: boolean) => void
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  addOrder: (order: Order) => void
  removeOrder: (orderId: string) => void,
  logoutUser: () => void
}

// Create the store
const useAdminStore = create<AdminState>((set) => ({
  isLoggedIn: false,
  products: [],
  orders: [],

  // Actions
  setLoggedIn: (status) => set({ isLoggedIn: status }),
  logoutUser: () => set({isLoggedIn : false}),
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  
  removeProduct: (productId) => set((state) => ({
    products: state.products.filter(p => p.id !== productId)
  })),
  
  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order]
  })),
  
  removeOrder: (orderId) => set((state) => ({
    orders: state.orders.filter(o => o.id !== orderId)
  })),
}))

export default useAdminStore