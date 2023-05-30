import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../Models/product.model';




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

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    // Make an HTTP request to fetch the products from the API
    this.http.get<Product[]>('http://localhost:5240/api/Products').subscribe(
      (response) => {
        this.products = response;
        this.filteredProducts = response;
        this.totalItems = this.filteredProducts.length;
      },
      (error) => {
        console.error(error);
        // Handle the error response from the backend
      }
    );
  }

  onFilterTextChanged() {
    // Filter the products based on the filter text
    this.filteredProducts = this.products.filter((product) => {
      const searchText = this.filterText.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchText) ||
        product.price.toString().includes(searchText) ||
        product.brand.toLowerCase().includes(searchText) ||
        product.productType.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText)
      );
    });
    this.totalItems = this.filteredProducts.length;
  }

  onPageChanged(page: number) {
    // Update the current page
    this.currentPage = page;
  }

  onPageSizeChanged() {
    // Reset the current page to the first page
    this.currentPage = 1;
  }

  sortProducts(column: string) {
    // Implement sorting logic based on the selected column
    // You can use array sorting methods like sort() or write custom sorting logic
  }
}
