import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as Leaflet from 'leaflet';
import { SportField } from 'src/app/models/sport-field';

@Component({
  selector: 'app-specific-sport-field-map',
  templateUrl: './specific-sport-field-map.component.html',
  styleUrls: ['./specific-sport-field-map.component.css'],
})
export class SpecificSportFieldMapComponent implements OnChanges {
  @Input() sportField: SportField;

  @Output() locationChange = new EventEmitter<SportField>();

  map: Leaflet.Map;
  marker: Leaflet.Marker;
  options: Leaflet.MapOptions = {
    layers: [Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})],
    zoom: 12,
    center: { lat: 44.439663, lng: 26.096306 },
  };
  markerPositionChanged: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    this.sportField = changes['sportField'].currentValue;
    this.initMarker(this.sportField?.address?.latitude, this.sportField?.address?.longitude);
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

  onSaveNewLocationMarker(event: any) {
    event.stopPropagation();
    this.sportField.address.latitude = this.marker.getLatLng().lat;
    this.sportField.address.longitude = this.marker.getLatLng().lng;
    this.locationChange.emit(this.sportField);
    this.markerPositionChanged = false;
  }

  onResetLocationMarker(event: any) {
    event.stopPropagation();
    const position = { lat: this.sportField.address.latitude, lng: this.sportField.address.longitude };
    this.marker.setLatLng(position);
    this.map.panTo(position);
    this.markerPositionChanged = false;
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
}
