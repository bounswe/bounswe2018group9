import { Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../data/providers/search/search.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('backButton') backButton = false;
  @Input('href') href: string;
  constructor(private authService: AuthService,
              private router: Router,
              private searchService: SearchService) { }

  ngOnInit() {

  }

  logout() {
    this.authService
      .logout()
      .subscribe(response => {
        this.router.navigate(['/signin']);
      })
  }

}
