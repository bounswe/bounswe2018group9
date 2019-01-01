import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AnnotationComponent} from './components/annotation/annotation.component';

const routes: Routes = [
  { path: ':id', component: AnnotationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnotationRoutingModule { }
