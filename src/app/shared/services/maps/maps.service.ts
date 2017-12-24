import { Injectable } from '@angular/core';
import { IAddress } from '../../../../../../sfw-metro/src/app/shared/interfaces/address.interface';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class MapsService {

  private mapsAPI: string = 'http://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {
  }

  getLatLngFromAddress(address: IAddress) {
    let params: HttpParams = new HttpParams(); // URLSearchParams = new URLSearchParams();
    params = params.append('address', address.streetName + ' ' + address.zip + ' ' + address.city);
    params.append('sensor', '0');

    return this.http.get(this.mapsAPI, {
      params: params
    }).map(this.extractData);
  }

  private extractData(response: Response) {
    return response;
  }

}


