import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Brand, ProductType, Product } from '../Models/brand-producttype.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  products: Product[] = [];
  maxSizeInBytes: number = 5242880; // 5MB

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      image: [''] // Remove Validators.required here
    });
    
  }

  ngOnInit(): void {
    this.getBrands();
    this.getProductTypes();
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
    if (this.brands.length > 0 && this.productTypes.length > 0 && this.products.length > 0) {
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

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }
  
    const imageFile: File = this.productForm.get('image')?.value;
    if (!imageFile) {
      console.log('Image file not selected');
      return;
    }
  
    if (imageFile.size > this.maxSizeInBytes) {
      console.log('Image file size exceeds the maximum limit of 5MB');
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const base64String = event.target?.result as string;
      const formData = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        brandId: this.productForm.value.brandId,
        productTypeId: this.productForm.value.productTypeId,
        image: base64String
      };
  
      this.http.post<any>('http://localhost:5240/api/store/addproduct', formData).subscribe(
        (response) => {
          // Product created successfully
          const productName = response.name;
          // Redirect to Product Listing page with success message
          // You can use Angular Router for navigation and pass the success message as a query parameter
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    };
    reader.readAsDataURL(imageFile);
  }
  
  
  getImageSource(base64String: string | undefined): string {
    if (base64String && base64String.startsWith('data:image')) {
      return base64String;
    }
    return base64String ? 'data:image/png;base64,' + base64String : '';
  }

  handleImageInputChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file }); // Update the assignment to set the file directly
    }
  }
}
