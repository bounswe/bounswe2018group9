import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../../data/providers/search/search.service";
import {ActivatedRoute} from "@angular/router";
import {SearchResult} from "../../../interfaces/search-result.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  currentSearchResult: SearchResult = null;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.queryParams['query']){
      let query = this.route.snapshot.queryParams['query'];
      this.searchService.get(query)
        .subscribe(
          result => this.currentSearchResult = result,
          error => console.log('An error occurred while getting search results for', query, error)
        )
    }
    this.route.queryParams.subscribe(
      (queries) => {
        console.log(queries);
        if(queries['query']){
          this.searchService.get(queries['query'])
            .subscribe(
              result => this.currentSearchResult = result,
              error => console.log('An error occurred while getting search results for', queries['query'], error)
            )
        }
      }
    )
  }

}
