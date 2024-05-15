
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router,private apiService: ApiService) { }
  isLoggedIn = true;
  isAdmin: boolean =false;

  ngOnInit() {
    this.apiService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
    this.apiService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  logout() {
    this.apiService.logout();
  }

}
