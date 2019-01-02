import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchService} from "../../../data/providers/search/search.service";
import {ActivatedRoute} from "@angular/router";
import {Event} from "../../../interfaces/";
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export const dateValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const minDate = control.get('beforeThan');
  const maxDate = control.get('afterThan');

  return maxDate > minDate ? {date: true} : null;
};

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  currentSearchResult: Event[] = null;
  form: FormGroup;
  eventCurrentDate;

  constructor(private searchService: SearchService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'search': [''],
      'beforeThan': [''],
      'afterThan': [''],
      'lowPrice': [''],
      'highPrice': [''],
      'currency': ['']
    }, { validators: dateValidator });
  }

  ngOnInit() {
    /*
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
              (result) => {
                this.currentSearchResult = result;
              },
              error => console.log('An error occurred while getting search results for', queries['query'], error)
            )
        }
      }
    ) */
    let now = new Date();
    this.eventCurrentDate = now.toISOString();
  }

  search(){
    console.log(this.form.value);
    this.searchService.advanced(this.form.value)
      .subscribe(
        (searchResult) => {
          this.currentSearchResult = searchResult;
        }
      )
  }

}
