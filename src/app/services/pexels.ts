import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  private http = inject(HttpClient);

  private apiUrl = 'https://api.pexels.com/v1/search';

  private apiKey = 'PEXELS_API_KEY';

  buscarFotos(query: string, page: number = 1) {

    const headers = new HttpHeaders({
      Authorization: this.apiKey
    });

    return this.http.get<any>(this.apiUrl, {
      headers,
      params: {
        query,
        page,
        per_page: 20
      }
    });
  }
}
