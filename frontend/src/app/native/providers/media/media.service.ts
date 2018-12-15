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

export interface MediaOptions {
  mediaType?: MediaType,
  destinationType?: DestinationType,
  sourceType?: PictureSourceType,
  includeFile?: boolean
};

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private options: MediaOptions = {
    mediaType: MediaType.PICTURE,
    destinationType: DestinationType.FILE_URL,
    includeFile: false
  };

  constructor(
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetCtrl: ActionSheetController,
    private fileService: FileService
  ) {}

  async get(options: MediaOptions  = {}): Promise<Media[]> {
    const opts = { ...this.options, ...options };

    if (!this.platform.is('mobile')) {
      let files = await this.fileService.get('image/*');
      return files.map(file => {
        return { type: 0, source: file.name, file: opts.includeFile ? file : null } as Media
      });
    }

    if (opts.sourceType === undefined) {
      let type = await this.presentActionSheet();
      if (!type) return null;
      opts.sourceType = type;
    }
    return this.camera.getPicture(opts)
      .then(result => {
        // TODO: Add file if desired
        return [ { type: 0, source: result } ]
      });
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
