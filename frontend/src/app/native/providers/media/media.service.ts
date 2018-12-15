import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import {
  Camera,
  CameraOptions,
  MediaType,
  DestinationType,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { Media } from '../../../interfaces';
import { FileService } from '../file/file.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private cameraOptions: CameraOptions = {
    mediaType: MediaType.PICTURE,
    destinationType: DestinationType.FILE_URL,
    correctOrientation: true
  };
  private options: { file?: boolean } = {
    file: true
  };

  constructor(
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetCtrl: ActionSheetController,
    private fileService: FileService
  ) {}

  async get(options: { file?: boolean } = {}, cameraOptions: CameraOptions  = {}): Promise<Media[]> {
    const opts = { ...this.options, ...options };
    const cameraOpts = { ...this.cameraOptions, ...cameraOptions };

    if (!this.platform.is('mobile')) {
      let files = await this.fileService.select('image/*');
      return files.map(file => {
        return { type: 0, source: file.name, file: opts.file ? file : null } as Media
      });
    }

    if (cameraOpts.sourceType === undefined) {
      let type = await this.presentActionSheet();
      if (type === null) return null;
      cameraOpts.sourceType = type;
    }

    let result = await this.camera.getPicture(cameraOpts);
    if (opts.file) {
      let file = await this.fileService.get(result);
      return [ { type: 0, source: result, file: file } ]
    }
    return [ { type: 0, source: result } ];
  }

  private async presentActionSheet(): Promise<PictureSourceType> {
    var take = true;
    var type: PictureSourceType;

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Select From Library',
        icon: 'image',
        handler: () => {
          type = PictureSourceType.PHOTOLIBRARY;
        }
      }, {
        text: 'Take a Picture',
        icon: 'camera',
        handler: () => {
          type = PictureSourceType.CAMERA;
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          take = false;
        }
      }]
    });
    await actionSheet.present();
    return actionSheet.onDidDismiss()
      .then(result => {
        if (take) {
          return type;
        }
        return null;
      });
  }
}
