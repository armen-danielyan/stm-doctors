import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class GetCityService {

  constructor(private http: HttpClient) { }



  getCountries() {
    return this.http.jsonp(
      `${environment.endPoints.listOfCountries}&method=database.getCountries&v=5.5&need_all=1&count=1000`,
      'callback');
  }

  getCities(id: number, text: string) {
    return this.http.jsonp(
      `${environment.endPoints.listOfCities}&method=database.getCities&v=5.5&country_id=${id}&offset=0&need_all=1&count=10&q=${text}`,
      'callback' );
  }




}
