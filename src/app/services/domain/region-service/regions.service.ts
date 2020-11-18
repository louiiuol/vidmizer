import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Region } from '../../../models/region.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private readonly regionsUrl = environment.api_geo + 'regions?fields=nom,code';
  private jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  regions = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getAll = (): Observable<Region[]> => {
    return this.http.get<Region[]>(this.regionsUrl, this.jsonHeader);
  }

}
