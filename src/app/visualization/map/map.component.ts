// map.component.ts
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { D3GeoMap } from './d3-geo-map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  private width: number = 800;
  private height: number = 400;
  
  private geoMap!: D3GeoMap;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.geoMap = new D3GeoMap(this.mapContainer);
    this.fetchData();
  }

  private fetchData(): void {
    this.dataService.getPovertyData("map").subscribe((data: { count: number, year: number }[]) => {
      this.geoMap.setData(data);
    });
    this.dataService.getGeoJsonData().subscribe((data: any) => {
      this.geoMap.setGeoJSONData(data);
    });
  }
}
