import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {level} from '../../models/level.model';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private readonly URL = 'assets/levels';

  constructor( private httpClient: HttpClient) { }

  getlevels(): Observable<level> {
    return this.httpClient.get<level>(`${this.URL}/levels.json`);
  }

}
