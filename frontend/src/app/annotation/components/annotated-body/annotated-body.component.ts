import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HighlightTag} from 'angular-text-input-highlight';
import {AnnotationService} from '../../annotation-service/annotation.service';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {PopoverController} from '@ionic/angular';
import {ShowAnnotationComponent} from '../show-annotation/show-annotation.component';

@Component({
  selector: 'app-annotated-body',
  templateUrl: './annotated-body.component.html',
  styleUrls: ['./annotated-body.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnnotatedBodyComponent implements OnInit {
  @Input('annotations') annotations;
  @Input('annotatedBodyText') text : string;
  @Input('selected') selected : boolean = false;
  selectedText : string = '';
  start: number;
  end : number;
  userId: string = "";
  @ViewChild('textarea') textareaElement;
  originalText :string;
  annotationClicked: HighlightTag;
  activated : boolean= false;


  constructor(private annotationService : AnnotationService,
              private authService : AuthService,
              private popoverController: PopoverController) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.originalText = this.text;
  }
  select(event: Event) {
    let valid = true;

    this.start = this.textareaElement.nativeElement.selectionStart;
    this.end = this.textareaElement.nativeElement.selectionEnd;
    this.annotations.filter((annot : HighlightTag)=> {
      if((annot.indices.end > this.start && annot.indices.start < this.start) ||
        (annot.indices.end > this.end && annot.indices.start <  this.end) ||
        (this.start <= annot.indices.start && this.end >= annot.indices.end) ) {
        valid  = false;
      }
    });
    if(valid){
      this.selectedText = this.text.slice(this.start,this.end);
      this.selected = true;
      console.log(this.start);
      console.log(this.end);
      console.log(this.selectedText);
    }else{
      alert('Please select empty parts.');
    }

    }
  unselect(){
    if (window.getSelection) {
      if (window.getSelection().empty) {  // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {  // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.getSelection) {  // IE?
      document.getSelection().empty();
    }
    this.selected = false;
    this.selectedText = '';
  }

  addDarkClass(elm: HTMLElement) {
    if (elm.classList.contains('bg-blue')) {
      elm.classList.add('bg-blue-dark');
    } else if (elm.classList.contains('bg-pink')) {
      elm.classList.add('bg-pink-dark');
    }
  }

  removeDarkClass(elm: HTMLElement) {
    elm.classList.remove('bg-blue-dark');
    elm.classList.remove('bg-pink-dark');
  }
  enter(){
    this.activated = true;
    this.textareaElement.nativeElement.value = this.originalText;
  }

  async popOverAnnotation(ev: any) {
    const popover = await this.popoverController.create({
      component: ShowAnnotationComponent,
      componentProps: {annotationClicked: this.annotationClicked,},
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
