import {
  Directive,
  ElementRef, HostBinding,
  HostListener, Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import {AnnotationComponent} from '../components/annotation/annotation.component';
import {ModalController, PopoverController} from '@ionic/angular';

@Directive({
  selector: '[annotate]'
})
export class AnnotationDirective implements OnInit{
  icon : ElementRef;
  @Input('annotate') annotations;
  @HostListener('select',['$event']) select(event : Event){
    console.log(event);
  }

  @HostListener('click',['$event']) click(event : Event){
    this.presentModal(event);
  }

  @HostListener('mouseenter',['$event']) mouseLeave(event : Event){
    this.rnd.setStyle(this.el.nativeElement,"border-bottom","2px solid red");
  }
  @HostListener('mouseleave',['$event']) mouseEnter(event : Event){
    this.rnd.setStyle(this.el.nativeElement,"border-bottom","2px solid teal");
  }

  constructor(private el : ElementRef,
              private rnd : Renderer2,
              private modalController: ModalController) { }

  ngOnInit(){
    // console.log(this.el);
    this.rnd.setStyle(this.el.nativeElement,"border-bottom", "2px solid teal");
    this.icon = this.rnd.createElement('ion-icon');
    this.rnd.setAttribute(this.icon,'name','create');
    this.rnd.insertBefore(this.rnd.parentNode(this.el.nativeElement),this.icon,this.rnd.nextSibling(this.el.nativeElement));

  }

  async presentModal(ev: any) {
    const modal = await this.modalController.create({
      component: AnnotationComponent,
      componentProps: {
        modalContr : this.modalController,
        nativeElement: this.el.nativeElement,
        annotations: this.annotations},
    keyboardClose:true,
    animated: true,
    mode:'md',
    cssClass: 'modalClass',
      showBackdrop:false});
    return await modal.present();
  }
}



