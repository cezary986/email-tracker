import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public downloadFile(url: string, fileName: any = true) {
    const link = document.createElement('a');
    link.download = name;
    link.href = url;
    link.click();
  }
}
