import { Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../../../auth/providers/auth/auth.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../data/providers/search/search.service";
import {SearchResult} from "../../../interfaces/search-result.interface";
import {UploadService} from "../../../data/providers/upload/upload.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('backButton') backButton = false;
  @Input('href') href: string;
  currentSearchResult: SearchResult = null;
  queryText: string;

  navigated: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private searchService: SearchService,
              public uploadService: UploadService) { }

  ngOnInit() {

  }

  logout() {
    this.authService
      .logout()
      .subscribe(response => {
        this.router.navigate(['/signin']);
      })
  }

  onSearchChange() {
    if (this.navigated) return;

    this.navigated = true;
    this.router.navigate(['/feed/search', { text: this.queryText }]).then(() => {
      // allow changes after 1 sec
      setTimeout(() => {
        this.navigated = false;
      }, 1000);
    });
    /*
    if(this.queryText.length == 0) {this.currentSearchResult = null;}
    else{
      this.searchService.get(this.queryText)
        .subscribe(
          result => this.currentSearchResult = result,
          error => console.log('An error occurred while getting search results for', this.queryText, error)
        )
    }
    */
  }

}
