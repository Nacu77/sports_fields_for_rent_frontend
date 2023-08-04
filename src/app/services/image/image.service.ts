import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private url = 'http://localhost:8080/api/images/';

  constructor(private http: HttpClient) {}

  upload(sportFieldId: string, imageFormData: FormData): Observable<Image> {
    return this.http.post<Image>(this.url + 'upload/' + sportFieldId, imageFormData);
  }

  getAllBySportFieldId(sportFieldId: string): Observable<Array<Image>> {
    return this.http.get<Array<Image>>(this.url + sportFieldId);
  }

  delete(sportFieldId: string, imageName: string): Observable<void> {
    return this.http.delete<void>(this.url + sportFieldId + '/' + imageName);
  }
}
