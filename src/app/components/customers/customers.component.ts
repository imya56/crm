import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/customer';
import * as _ from 'lodash';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  headerTitle: string;
  headerIcon: string;
  customers: Customer[];
  customersCache: Customer[];
  phone: string = '';


  constructor(
    private title: Title,
    private _customersServices: CustomersService
  ) { }

  ngOnInit(): void {
    this.headerIcon = 'fas fa-user';
    this.headerTitle = 'Customers';
    this.title.setTitle('Company crm | customers page');
    this._customersServices.getCustomers().subscribe(customers => this.customers = this.customersCache = customers);

  }

  showTools(event): void {
    event.target.children[0].children[0].style.cssText = 'visibility: visible !important'
  }

  hideTool(event): void {
    event.target.children[0].children[0].style.cssText = 'visibility: hidden !important'

  }
  onDeleteCustomer(customerId, event): void {
    event.preventDefault();
    if (confirm('Are you sure')) {
      this._customersServices.deleteCustomer(customerId);
    }
  }

  onSearch(prop: string): void {
    let clientText = this[prop].toLowerCase().trim();
    if (clientText.length > 0) {
      this.customers = this.customersCache.filter(customer => _.includes(customer[prop].toLowerCase(), clientText));
    } else {
      this.customers = this.customersCache;
    }
  }

}
