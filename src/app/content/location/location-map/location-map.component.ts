import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../../shared/services/maps/maps.service';
import { Observable } from 'rxjs/Observable';
import { IMarker } from '../../../shared/interfaces/marker.interface';
import { ILocation } from '../../../shared/interfaces/location.interface';
import { CategoryService } from '../../../shared/services/category/category.service';
import { LocationService } from '../../../shared/services/location/location.service';
import { ICategory } from '../../../shared/interfaces/category.interface';

@Component({
  selector: 'location-map',
  templateUrl: './location-map.component.html',
  styleUrls: [
    'location-map.component.scss'
  ]
})
export class LocationMapComponent implements OnInit {

  public locations$: Observable<ILocation[]>;

  public response: any;
  public errorMessage: any;

  public zoom: number = 10;

  public selectedLocations: string[] = [];

  // initial center position for the map
  public lat: number = 49.480584;
  public lng: number = 7.097050;

  public markers: IMarker[] = [];

  public filterType: string = '';
  public filterTitle: string = '';
  public filterKey: string = '';


  constructor(public categoryService: CategoryService,
    public locationService: LocationService,
    private mapsService: MapsService) {
    this.locations$ = locationService.locations$;
  }

  ngOnInit() {
  }

  toggleLocationMarker(location: ILocation) {
    if (this.selectedLocations.indexOf(location.id) > -1) {
      this.selectedLocations.splice(this.selectedLocations.indexOf(location.id), 1);
      this.removeMarker(location);
    } else {
      this.selectedLocations.push(location.id);
      this.getLatLng(location);
    }
  }

  getLatLng(location: ILocation) {
    const _that = this;
    this.mapsService.getLatLngFromAddress(location.address).subscribe(
      (response: any) => _that.setMarker(response, location),
      (error: any) => this.errorMessage = <any>error
    );
  }

  setMarker(response: any, location: ILocation) {
    this.response = response.results[0];
    if (this.response) {

      this.lat = response.results[0].geometry.location.lat;
      this.lng = response.results[0].geometry.location.lng;

      this.markers.push({
        draggable: false,
        label: location.title,
        lat: response.results[0].geometry.location.lat,
        lng: response.results[0].geometry.location.lng
      });
    }
  }

  removeMarker(location: ILocation) {
    for (let i = 0; i < this.markers.length; i++) {
      if (this.markers[i].label === location.title) {
        this.markers.splice(<any>this.markers[i], 1);
      }
    }
  }

  resetMarkers() {
    this.markers = [];
    this.selectedLocations = [];
  }

  public setFilter(type: string, category: ICategory) {
    this.filterType = type;
    if (category) {
      this.filterKey = category.id;
      this.filterTitle = category.title;
    } else {
      this.filterKey = '';
      this.filterTitle = '';
    }
  }

}
