import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Customer } from '../../models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  id: string;
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  };


  constructor(
    private _title: Title,
    private _customersService: CustomersService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _fms: FlashMessagesService
  ) { }

  ngOnInit() {
    this._title.setTitle(' Company crm | Edit customer form');
    this.headerTitle = 'Edit customer form';
    this.headerIcon = 'fas fa-pen';
    this.id = this._activateRoute.snapshot.params['id'];
    this._customersService.getCustomer(this.id).subscribe(customer => this.customer = customer);


  }
  onSubmit({ value, valid }: { value: Customer, valid: boolean }): void {
    if (valid) {
      this._fms.show('Customer updated', {
        timeout: 3000,
        cssClass: 'fixed-top m-auto bg-success w-50 text-light text-center',
      });
      value.id = this.id;
      this._customersService.updateCustomer(value);
      this._router.navigate(['/customers']);
    }
  }


}
