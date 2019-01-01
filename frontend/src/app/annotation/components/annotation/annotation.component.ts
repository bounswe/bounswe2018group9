import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AnnotationService} from '../../annotation-service/annotation.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthService} from '../../../auth/providers/auth/auth.service';
import {Annotation} from '../../../interfaces/annotation.interface';

@Component({
  selector: 'app-annotation-component',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit {
  sub : Subscription;
  annotations;
  @Input('newAnnotationText') newAnnotationText ;
  annotationId : string;
  modalContr : ModalController;
  @Input() showAnnotationBox : boolean = false;
  @ViewChild('app-annotated-body') annotatedBody;
  nativeElement : HTMLElement;
  annotatedBodyText : string;
  userId : string;
  @ViewChild('s') element;

  constructor(private annotationService : AnnotationService,
              private router : Router,
              private route : ActivatedRoute,
              private navParams : NavParams,
              private authService : AuthService) {

  }
  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.modalContr = this.navParams.get('modalContr');
    this.nativeElement = this.navParams.get('nativeElement');
    this.annotations = this.navParams.get('annotations');
    this.annotatedBodyText = this.nativeElement.innerText;
  }
  save(startInput : number, endInput : number){
    if(( startInput == 0 || startInput) && endInput){
      let annotation : Annotation = {
        type: "Annotation",
        body: [{
          type: "TextualBody",
          value: this.newAnnotationText
        }],
        target: [{
          source: this.router.url,
          selector: {
            type: "XPathSelector",
            value: this.getElementTreeXPath(this.nativeElement),
            refinedBy: {
              type: "TextPositionSelector",
              start: startInput,
              end: endInput
            }
          }
        }],
        creator: this.userId
      };
      console.log(annotation);
      this.annotationService.postAnnotation(annotation).subscribe((posted)=>{
        console.log(JSON.stringify(posted));
        alert('saved');
        let color = 'bg-pink';
        this.authService.getUserData(this.userId).subscribe((next)=>{
          this.annotations.push({
            indices: {
              start: annotation.target[0].selector.refinedBy.start,
              end: annotation.target[0].selector.refinedBy.end
            },
            cssClass: color,
            data: {
              value : annotation.body[0].value,
              user: {name: next.name,id :next._id}
            }
          });
        });
      },(err)=>{
        console.log(err);
      });
    }else{
      console.log(startInput);
      console.log(endInput);
      alert('Select somewhere');
    }

  }
  cancel(){
    this.modalContr.dismiss();
  }

  getElementTreeXPath(element) {
    let paths = [];

    // Use nodeName (instead of localName) so namespace prefix is included (if any).
    for (; element && element.nodeType == 1; element = element.parentNode)  {
      let index = 0;
      let hasMultiple = false;

      for (let sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
        // Ignore document type declaration.
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
          continue;

        if (sibling.nodeName == element.nodeName)
          ++index;
      }
      for (let sibling = element.nextSibling; sibling; sibling = sibling.nextSibling) {
        // Ignore document type declaration.
        if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
          continue;

        if (sibling.nodeName == element.nodeName)
          hasMultiple = true;
      }

      var tagName = element.nodeName.toLowerCase();
      let otherWise = "";
      if(hasMultiple){
        otherWise = "[1]";
      }
      var pathIndex = (index ? "[" + (index+1) + "]" : otherWise);
      paths.splice(0, 0, tagName + pathIndex);
    }
    return paths.length ? "/" + paths.join("/") : null;
  };
}
