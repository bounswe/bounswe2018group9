import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { Platform } from '@ionic/angular';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private options: CameraOptions;

  constructor(
    private platform: Platform,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.options = {
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.FILE_URI
    };
  }

  async get(options: CameraOptions = {}) {
    if (!this.platform.is('mobile')) {
      return this.clickInput();
    }

    const opts = { ...this.options, ...options };
    if (opts.sourceType === undefined) {
      let type = await this.presentActionSheet();
      if (!type) return null;
      opts.sourceType = type;
    }
    return this.camera.getPicture(opts);
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

  private async clickInput() {
    return new Promise((resolve, reject) => {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.hidden = true;

      // event listeners
      let changeListener = (event: Event) => {
        let files: File[] = Array.from(<FileList>event.target['files']);
        let media = files.map(file => {
          return { type: 0, file: file.name }
        });
        resolve(media);
      };
      let focusListener = (event: Event) => reject();

      // register listeners
      input.addEventListener('change', changeListener, { once: true });
      window.addEventListener('focus', focusListener, { once: true });

      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    });
  }
}
