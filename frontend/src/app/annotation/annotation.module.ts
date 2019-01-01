import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { AnnotationDirective } from './annotation-directive/annotation.directive';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AnnotationRoutingModule } from './annotation-routing.module';
import { AnnotatedBodyComponent } from './components/annotated-body/annotated-body.component';
import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { ShowAnnotationComponent } from './components/show-annotation/show-annotation.component';

@NgModule({
  declarations: [
    AnnotationComponent,
    AnnotationDirective,
    AnnotatedBodyComponent,
    ShowAnnotationComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    AnnotationRoutingModule,
    TextInputHighlightModule
  ],
  exports: [AnnotationDirective, AnnotationComponent, AnnotatedBodyComponent,ShowAnnotationComponent],
  bootstrap : [AnnotationComponent],
  entryComponents: [ShowAnnotationComponent]
})
export class AnnotationModule { }
