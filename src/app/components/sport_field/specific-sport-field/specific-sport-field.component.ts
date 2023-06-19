import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SportField } from 'src/app/models/sport-field';
import { SportFieldService } from 'src/app/services/sport_field/sport-field.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-specific-sport-field',
  templateUrl: './specific-sport-field.component.html',
  styleUrls: ['./specific-sport-field.component.css'],
})
export class SpecificSportFieldComponent implements OnInit {
  sportField: SportField;

  map!: Leaflet.Map;
  marker: Leaflet.Marker;
  options: Leaflet.MapOptions = {
    layers: [Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})],
    zoom: 12,
    center: { lat: 44.439663, lng: 26.096306 },
  };
  markerPositionChanged: boolean = false;

  constructor(private sportFieldService: SportFieldService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sportFieldService.findById(params['id']).subscribe((sportField) => {
        this.sportField = sportField;
        this.initMarker(this.sportField.address.latitude, this.sportField.address.longitude);
      });
    });
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
  }

  mapClicked($event: any) {
    if (!this.marker) {
      this.initMarker($event.latlng.lat, $event.latlng.lng);
    }
    const position = { lat: $event.latlng.lat, lng: $event.latlng.lng };
    this.marker.setLatLng(position);
    this.map.panTo(position);
    this.markerPositionChanged = true;
  }

  markerDragEnd($event: any) {
    this.map.panTo({ lat: $event.target.getLatLng().lat, lng: $event.target.getLatLng().lng });
    this.markerPositionChanged = true;
  }

  onSaveNewLocationMarker() {
    this.sportField.address.latitude = this.marker.getLatLng().lat;
    this.sportField.address.longitude = this.marker.getLatLng().lng;

    this.sportFieldService.update(this.sportField).subscribe((_) => {
      this.markerPositionChanged = false;
      this.savedChangesSnackBar('New location marker saved');
    });
  }

  private initMarker(lat: number, lng: number) {
    if (!lat || !lng) {
      return;
    }

    const position = { lat: lat, lng: lng };

    this.marker = Leaflet.marker(position, {
      draggable: true,
      icon: new Leaflet.Icon({
        iconSize: [50, 41],
        iconAnchor: [13, 41],
        iconUrl: '../../../assets/map_icons/map_marker.svg',
      }),
    }).on('dragend', (event) => this.markerDragEnd(event));
    this.marker
      .addTo(this.map)
      .bindPopup(
        `<div class='text-center'><b>${this.sportField.address.country},  ${this.sportField.address.city},  ${this.sportField.address.street},  ${this.sportField.address.number}</b></div>`
      );
    this.map.panTo(position);
  }

  private savedChangesSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}
