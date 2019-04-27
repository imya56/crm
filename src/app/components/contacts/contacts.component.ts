import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Contact } from '../../models/contact';
import { ContactsService } from '../../services/contacts.service';
import * as _ from 'lodash';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  headerTitle: string;
  headerIcon: string;



  constructor(
    private _titleService: Title,
    private _contactService: ContactsService,
    private _fms: FlashMessagesService
  ) { }




  ngOnInit(): void {
    this.headerIcon = 'fas fa-envelope';
    this.headerTitle = 'Contacts';
    this.contacts = [];
    this._titleService.setTitle('Company crm | Contacts Page');
    this._contactService.getContacts().subscribe((contacts: Contact[]) => {
      this.contacts = _.sortBy(contacts, ['name'])
    });
  }

}
