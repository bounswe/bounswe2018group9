import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { File as FileNative } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { MediaService } from './providers/media/media.service';
import { FileService } from './providers/file/file.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FileNative,
    Camera,
    ImagePicker,
    FileService,
    MediaService,
  ]
})
export class NativeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NativeModule,
      providers: [
        MediaService,
        FileService
      ]
    }
  }
}
