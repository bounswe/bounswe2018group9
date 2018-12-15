import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {

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
