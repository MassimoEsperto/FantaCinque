import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utils } from 'src/app/classes/utils/utils';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {


  constructor(
    private elementRef: ElementRef, 
    private router: Router, 
    private service: AuthService) { }
 
  username: string;
  isAdmin: boolean;
  isPlayer: boolean;
  

  ngAfterViewInit() {
    Utils.backgroundWhite(this.elementRef)
  }

  ngOnInit() {
    this.isAdmin = this.service.isAdmin();
    this.username = this.service.username();
    this.isPlayer = this.service.isPlayer();
   
  }

  logOut() {
    this.service.logout();
    this.router.navigate(['login']);
  }

}
