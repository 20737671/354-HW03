// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Product } from '../Models/product.model';
// import { Brand, ProductType } from '../Models/brand-producttype.model';

// @Component({
//   selector: 'app-listing',
//   templateUrl: './listing.component.html',
//   styleUrls: ['./listing.component.css']
// })
// export class ListingComponent implements OnInit {
//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   filterText: string = '';
//   pageSizeOptions: number[] = [3, 5, 10];
//   pageSize: number = 5;
//   currentPage: number = 1;
//   totalItems: number = 0;
//   brands: Brand[] = [];
//   productTypes: ProductType[] = [];

//   constructor(private http: HttpClient) { }

//   ngOnInit() {
//     this.getProducts();
//     this.getBrands();
//     this.getProductTypes();
//   }

//   getProducts() {
//     this.http.get<Product[]>('http://localhost:5240/api/store/productlisting').subscribe(
//       (response) => {
//         this.products = response;
//         this.updateFilteredProducts();
//       },
//       (error) => {
//         console.error(error);
//         // Handle the error response from the backend
//       }
//     );
//   }

//   getBrands() {
//     this.http.get<Brand[]>('http://localhost:5240/api/store/getbrands').subscribe(
//       (response) => {
//         this.brands = response;
//         this.updateFilteredProducts();
//       },
//       (error) => {
//         console.error(error);
//         // Handle the error response from the backend
//       }
//     );
//   }

//   getProductTypes() {
//     this.http.get<ProductType[]>('http://localhost:5240/api/store/getproducttypes').subscribe(
//       (response) => {
//         this.productTypes = response;
//         this.updateFilteredProducts();
//       },
//       (error) => {
//         console.error(error);
//         // Handle the error response from the backend
//       }
//     );
//   }

//   updateFilteredProducts() {
//     // Only update the filtered products if all the necessary data is available
//     if (this.products.length > 0 && this.brands.length > 0 && this.productTypes.length > 0) {
//       this.filteredProducts = this.products.map((product) => {
//         const brand = this.brands.find((b) => b.brandId === product.brandId);
//         const productType = this.productTypes.find((pt) => pt.productTypeId === product.productTypeId);

//         return {
//           ...product,
//           brand: brand ? brand.name : '',
//           productType: productType ? productType.name : '',
//         };
//       });

//       this.totalItems = this.filteredProducts.length;
//     }
//   }

//   onFilterTextChanged() {
//     // Convert the filter text to lowercase for case-insensitive matching
//     const searchText = this.filterText.toLowerCase();

//     // Filter the products based on the filter text
//     this.filteredProducts = this.products.filter((product) => {
//       return (
//         product.name.toLowerCase().includes(searchText) ||
//         product.price.toString().includes(searchText) ||
//         product.brandId.toLowerCase().includes(searchText) ||
//         product.productTypeId.toLowerCase().includes(searchText) ||
//         product.description.toLowerCase().includes(searchText)
//       );
//     });

//     this.totalItems = this.filteredProducts.length;
//   }

//   onPageChanged(page: number) {
//     // Update the current page
//     this.currentPage = page;
//   }

//   onPageSizeChanged() {
//     // Reset the current page to the first page
//     this.currentPage = 1;
//   }

//   sortProducts(column: string) {
//     switch (column) {
//       case 'name':
//         this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case 'price':
//         this.filteredProducts.sort((a, b) => a.price - b.price);
//         break;
//       case 'brand':
//         this.filteredProducts.sort((a, b) => a.brand.localeCompare(b.brand));
//         break;
//       case 'productType':
//         this.filteredProducts.sort((a, b) => a.productType.localeCompare(b.productType));
//         break;
//       case 'description':
//         this.filteredProducts.sort((a, b) => a.description.localeCompare(b.description));
//         break;
//       default:
//         break;
//     }
//   }




import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product.model';
import { Brand, ProductType } from '../Models/brand-producttype.model';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  filterText: string = '';
  pageSizeOptions: number[] = [3, 5, 10];
  pageSize: number = 5;
  currentPage: number = 1;
  totalItems: number = 0;
  brands: Brand[] = [];
  productTypes: ProductType[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  }

  getProducts() {
    this.http.get<Product[]>('http://localhost:5240/api/store/productlisting').subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = this.products;
        this.totalItems = this.filteredProducts.length;
        this.mapProductBrandAndTypeNames();
      },
      (error) => {
        console.error(error);
        // Handle the error response from the backend
      }
    );
  }

  getBrands() {
    this.http.get<Brand[]>('http://localhost:5240/api/store/getbrands').subscribe(
      (response) => {
        this.brands = response;
        this.mapProductBrandAndTypeNames();
      },
      (error) => {
        console.error(error);
        // Handle the error response from the backend
      }
    );
  }

  getProductTypes() {
    this.http.get<ProductType[]>('http://localhost:5240/api/store/getproducttypes').subscribe(
      (response) => {
        this.productTypes = response;
        this.mapProductBrandAndTypeNames();
      },
      (error) => {
        console.error(error);
        // Handle the error response from the backend
      }
    );
  }

  mapProductBrandAndTypeNames() {
    if (this.brands.length > 0 && this.productTypes.length > 0) {
      this.products.forEach((product) => {
        const brand = this.brands.find((b) => b.brandId === product.brandId);
        const productType = this.productTypes.find((pt) => pt.productTypeId === product.productTypeId);
        if (brand) {
          product.brand = { ...brand };
        }
        if (productType) {
          product.productType = { ...productType };
        }
      });
    }
  }
  
  

  onFilterTextChanged() {
    // Convert the filter text to lowercase for case-insensitive matching
    const searchText = this.filterText.toLowerCase();
  
    // Filter the products based on the filter text
    this.filteredProducts = this.products.filter((product) => {
      const brandName = this.getProductBrandName(product.brandId).toLowerCase();
      const productTypeName = this.getProductTypeName(product.productTypeId).toLowerCase();
  
      return (
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().toLowerCase().includes(searchText) ||
        brandName.includes(searchText) ||
        productTypeName.includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
      );
    });
  
    this.totalItems = this.filteredProducts.length;
  }
  
  

  getProductBrandName(brandId: number): string {
    const brand = this.brands.find((b) => b.brandId === brandId);
    return brand ? brand.name : '';
  }
  
  getProductTypeName(productTypeId: number): string {
    const productType = this.productTypes.find((pt) => pt.productTypeId === productTypeId);
    return productType ? productType.name : '';
  }
  

  onPageChanged(page: number) {
    // Update the current page
    this.currentPage = page;
  }
  
  onPageSizeChanged() {
    this.currentPage = 1;
  }

  sortColumn: string = '';
sortOrder: string = 'ascending';

sortProducts(column: string) {
  if (column === this.sortColumn) {
    this.sortOrder = this.sortOrder === 'ascending' ? 'descending' : 'ascending';
  } else {
    this.sortColumn = column;
    this.sortOrder = 'ascending';
  }

  this.filteredProducts.sort((a, b) => {
    let comparison = 0;

    if (column === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (column === 'price') {
      comparison = a.price - b.price;
    } else if (column === 'brand') {
      const brandA = this.getProductBrandName(a.brandId).toLowerCase();
      const brandB = this.getProductBrandName(b.brandId).toLowerCase();
      comparison = brandA.localeCompare(brandB);
    } else if (column === 'productType') {
      const typeA = this.getProductTypeName(a.productTypeId).toLowerCase();
      const typeB = this.getProductTypeName(b.productTypeId).toLowerCase();
      comparison = typeA.localeCompare(typeB);
    } else if (column === 'description') {
      comparison = a.description.localeCompare(b.description);
    }

    return this.sortOrder === 'ascending' ? comparison : -comparison;
  });
}

isSortedAscending(column: string): boolean {
  return column === this.sortColumn && this.sortOrder === 'ascending';
}

isSortedDescending(column: string): boolean {
  return column === this.sortColumn && this.sortOrder === 'descending';
}

  
  
  
  
  
}
