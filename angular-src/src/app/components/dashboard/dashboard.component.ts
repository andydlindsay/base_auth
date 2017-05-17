import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: Object;
  
  constructor(
    private auth: AuthService,
    private titleService: Title,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Dashboard - Base Auth');
    this.auth.getUserProfile().subscribe(
      data => {
        this.user = data.user;
      }, 
      err => {
        console.log(err);
        return false;
      }
    );
  }

}