import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Coordinate } from 'src/app/interface/coordinate';
import  * as Leaflet from 'leaflet'
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  mode: "edit" | "locked" ="locked";
  buttonText: "Save Changes" | "Edit" = "Edit"
  marker = new Leaflet.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconSize: [32, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  })

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  // the reasonfor the activated route is that we can get theid of the user

  ngOnInit(): void {
    this.user = (<User>(this.activatedRoute.snapshot.data['resolvedResponse'].results[0]));
    console.log(this.user)

    this.loadMap(this.user.coordinate)
    // this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
    //   console.log("response Id", params.get('uuid')!)
    //   this.userService.getUser(params.get('uuid')!).subscribe(
    //     (response: any) => {
    //       console.log(response)
    //       this.response = response
    //     }
    //   )
    // })
  }

  changeMode(mode: "edit" | "locked"): void {
    console.log(mode)
    this.mode = this.mode === 'locked' ? 'edit' : 'locked'
    this.buttonText = this.buttonText === "Edit" ? "Save Changes" : "Edit"

    if (mode === 'edit') {
      // Logic to update the user
      console.log("Updating user in the back end");
    }
  }

  private loadMap(coordinate: Coordinate): void{
    const map = Leaflet.map('map', {
      center: [coordinate.latitude, coordinate.longitude], 
      zoom: 8
    });
    // =actual picture to put our location
    const mainLayer = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 30,
      crossOrigin: true,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

  mainLayer.addTo(map)
  const marker = Leaflet.marker([coordinate.latitude, coordinate.longitude], {icon: this.marker});
  marker.addTo(map).bindPopup(`${this.user.username}'s Location`).openPopup();
 }
}
