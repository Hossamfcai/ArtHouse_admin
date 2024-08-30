import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { DataService, Department } from '../../services/data.service';

import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationComponent } from './notification/notification.component';
import { routeAnimationState } from '../../../../shared/route.animation';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  animations: [routeAnimationState],
})
export class ProductComponent implements OnInit {
  constructor(private _dataService: DataService) {}
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  status: string = '';
  products: Product[] = [];
  departments: Department[] = [];
  Base_Url: string = 'http://localhost:3000/';
  form!: FormGroup;
  addForm!: FormGroup;
  ngOnInit(): void {
    this._dataService.getProducts().subscribe((data) => {
      this._dataService.updateProducts(data);
      this.products = this._dataService.getAllProducts();
    });
    this._dataService.getDepartments().subscribe((data) => {
      this.departments = data;
    });

    this.form = new FormGroup({
      filename: new FormControl(null),
      title: new FormControl(''),
      price: new FormControl(''),
    });

    this.addForm = new FormGroup({
      filename: new FormControl(null),
      title: new FormControl(''),
      price: new FormControl(''),
      departmentName: new FormControl(''),
    });
  }
  setIndex(i: number, id: string) {
    this._dataService.updateIndex(i);
    this._dataService.updateId(id);
    this.form.patchValue({ filename: null, title: '', price: '' });
  }
  submit() {
    const index = this._dataService.getIndex();
    const id = this._dataService.getId();
    console.log(index, id);
    //update image
    if (this.form.value.filename !== null) {
      console.log(this.form.value.filename);
      const formData = new FormData();
      formData.append('filename', this.form.get('filename')?.value);
      this._dataService.updateProductImage(formData, id).subscribe((data) => {
        this.products[index].filename = data.filename;
      });
    }
    //update content
    const title =
      this.form.value.title === ''
        ? this.products[index].title
        : this.form.value.title;
    const price =
      this.form.value.price === ''
        ? this.products[index].price
        : this.form.value.price;
    this._dataService.updateProduct(title, price, id).subscribe((data) => {
      this.products[index].title = data.title;
      this.products[index].price = data.price;
    });
  }
  addProduct() {
    const formData = new FormData();
    formData.append('filename', this.addForm.get('filename')?.value);
    formData.append('title', this.addForm.get('title')?.value);
    formData.append('price', this.addForm.get('price')?.value);
    formData.append(
      'departmentName',
      this.addForm.get('departmentName')?.value
    );

    this._dataService.addProduct(formData).subscribe((data) => {
      this._dataService.updateProducts(data);
      this.products = this._dataService.getAllProducts();
      this._dataService.updateStatus('added');
      this.status = this._dataService.getStatus();
    });
    this.addForm.patchValue({
      filename: null,
      title: '',
      price: '',
      departmentName: '',
    });
    this.showToast();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.patchValue({ filename: file });
  }
  onFileChangeProduct(event: any) {
    const file = event.target.files[0];
    this.addForm.patchValue({ filename: file });
  }
  @ViewChild('toast') toast!: NotificationComponent;

  showToast() {
    this.toast.show();
  }
  deleteProduct(id: string) {
    this._dataService.deleteProduct(id).subscribe((data) => {
      this._dataService.updateProducts(data);
      this.products = this._dataService.getAllProducts();
      this._dataService.updateStatus('deleted');
      this.status = this._dataService.getStatus();
      this.showToast();
    });
  }
}

export interface Product {
  _id: string;
  filename: string;
  title: string;
  price: string;
  departmentName: string;
  department: {
    _id: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
