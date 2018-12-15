import { Injectable } from '@angular/core';

import { File as FileNative, Entry, FileEntry, IFile } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fileNative: FileNative) {}

  // TODO: Refactor FileService 'get' pathway (File | Blob??)
  async extract(path: string): Promise<File | Blob> {
    let entry = await this.fileNative.resolveLocalFilesystemUrl(path);
    if (entry.isFile) {
      return new Promise<File | Blob>((resolve, reject) => {
        (entry as FileEntry).file(file => {
          var reader = new FileReader();
          reader.onloadend = function (e) {
            let blob = new Blob([reader.result], { type: file.type });
            resolve(blob)
          };
          reader.onerror = function (e) {
            reject(e);
          }
          reader.readAsArrayBuffer(file);
        }, error => {
          reject(error);
        })
      });
    } else {
      return null;
    }
  }

  async get(type: string): Promise<File[]> {
    return new Promise<File[]>((resolve, reject) => {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = type;
      input.hidden = true;

      // event listeners
      let changeListener = (event: Event) => {
        resolve(Array.from(<FileList>event.target['files']));
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
