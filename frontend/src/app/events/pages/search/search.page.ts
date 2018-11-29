import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  searchSemanticly(){
    alert('searching semantically');
  }
  searchingLocationally(){
    alert('searching locationally');
  }
  searchTimeBased(){
    alert('searching time based');
  }
  searchContentBased(){
    alert('searching content based');
  }
}
