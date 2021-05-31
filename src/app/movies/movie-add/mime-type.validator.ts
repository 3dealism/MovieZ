import {AbstractControl} from '@angular/forms';
import {Observable, Observer, of} from 'rxjs';

export const mimeType = (control: AbstractControl):
  Promise<{ [key: string]: any }> | Observable<{ [key: string]: any } | null> => {
  if (typeof (control.value) === 'string') {
    return of(null); // will return that this is valid
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  return new Observable((observer: Observer<{ [key: string]: any } | null>) => {
    fileReader.addEventListener('loadend', () => {
      // new Array of 8bit unsigned integers
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      let isValid: boolean;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16); // 16 -> convert to hexadecimal string
      }
      // pngs and jpegs
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        // console.log('Image is valid');
        observer.next(null);
      } else {
        observer.next({invalidMimeType: true});
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
};
