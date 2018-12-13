import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { MediaService } from './providers/media/media.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    Camera,
    ImagePicker,
    MediaService
  ]
})
export class NativeModule { }
