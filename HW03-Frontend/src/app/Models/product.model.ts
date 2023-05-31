export interface Brand {
  brandId: number;
  name: string;
}

export interface ProductType {
  productTypeId: number;
  name: string;
}

export interface Product {
  productId: number;
  name: string;
  price: number;
  image: string | null;
  brandId: number;
  productTypeId: number;
  description: string;
  productType?: ProductType;
  brand?: Brand;
}
