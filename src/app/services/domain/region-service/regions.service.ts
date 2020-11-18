import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Region } from '../../../models/region.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Simple Service to retrieve all
 */
@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private readonly regionsUrl = environment.api_geo + 'regions?fields=nom,code';
  private readonly jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  /**
   * HTTP GET request for all French regions
   * @return Une observable contenant une liste de régions en cas de succès
   */
  getAll = (): Observable<Region[]> => this.http.get<Region[]>((this.regionsUrl), this.jsonHeader);

}
