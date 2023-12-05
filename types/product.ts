type Product = {
  title: string
  description: string
  price: number
  compareAtPrice: number
  chargeTaxes: boolean
  costPerItem: number
  profit: number
  margin: number
  trackQuantity: boolean
  quantity: number
  continueSellingWhenOutOfStock: boolean
  hasSku: boolean
  isPhysicalProduct: boolean
  weight: number
  weightUnit: string
  countryOfOrigin: string
  status: string
  productCategory: string
  productType: string
  vendor: string
  collections: string
  tags: string[]
}

export default Product
