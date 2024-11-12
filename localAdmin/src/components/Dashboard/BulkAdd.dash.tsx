import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

import { toast } from "../../hooks/use-toast"
import { ApiResponse } from "../../interfaces/ApiResponses"
import { apiClient } from "../../utilities/apiClient"
import { Save, Package, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ScrollArea } from "../ui/scroll-area"

interface Product {
  id: string
  productName: string
  productCompany: string
  productCategory: string
  productStockQuantity: number
  productPrice: number
}

const INITIAL_PRODUCT: Product = {
  id: "",
  productName: "",
  productCompany: "",
  productCategory: "",
  productStockQuantity: 0,
  productPrice: 0,
}

const CATEGORIES = ["Electronics", "Clothing", "Books", "Home & Garden", "Toys", "Sports", "Beauty"]

const AdminBulkAddProduct = () => {
  const [products, setProducts] = useState<Product[]>([{ ...INITIAL_PRODUCT, id: "1" }])
  const [apiResponse, setApiResponse] = useState<ApiResponse>()

  const addProduct = () => {
    setProducts([...products, { ...INITIAL_PRODUCT, id: Date.now().toString() }])
  }

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, [field]: value } : product
    ))
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const sendProducts = async () => {
    try {
      const validProducts = products.filter(p => p.productName && p.productCompany)
      if (validProducts.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one valid product.",
          variant: "destructive",
        })
        return
      }

      const response : any = await apiClient.post("/admin/products/bulkAdd", { products: validProducts })
      setApiResponse(response.data)
      toast({
        title: "Success",
        description: `${validProducts.length} products added successfully`,
      })
      setProducts([{ ...INITIAL_PRODUCT, id: Date.now().toString() }]) // Reset form after successful submission
    } catch (error) {
      console.error("Error adding products:", error)
      toast({
        title: "Error",
        description: "Failed to add products. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Bulk Add Products
          </CardTitle>
          <CardDescription>Add multiple products to the inventory at once.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-350px)] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Product Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Input
                        value={product.productName}
                        onChange={(e) => updateProduct(product.id, "productName", e.target.value)}
                        placeholder="Product Name"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={product.productCompany}
                        onChange={(e) => updateProduct(product.id, "productCompany", e.target.value)}
                        placeholder="Company"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={product.productCategory}
                        onValueChange={(value : any) => updateProduct(product.id, "productCategory", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category.toLowerCase()}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.productStockQuantity}
                        onChange={(e) => updateProduct(product.id, "productStockQuantity", parseInt(e.target.value))}
                        placeholder="Stock Quantity"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={product.productPrice}
                        onChange={(e) => updateProduct(product.id, "productPrice", parseFloat(e.target.value))}
                        placeholder="Price"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive" size="icon" onClick={() => removeProduct(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
          <div className="mt-4">
            <Button onClick={addProduct} variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Add Another Product
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Total Products: <span className="font-bold">{products.length}</span>
          </div>
          <Button onClick={sendProducts}>
            <Save className="mr-2 h-4 w-4" /> Save All Products
          </Button>
        </CardFooter>
      </Card>

      {apiResponse && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AdminBulkAddProduct