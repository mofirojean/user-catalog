import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../interface/response';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  // Fetch users 
  getUsers(size: number = 10): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?results=${size}`).pipe(
      map(this.processResponse)
    )
  }

  // Fetch user using the user's id
  getUser(uuid: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/?uuid=${uuid}`).pipe(
      map(this.processResponse)
    )
  }

  // remember we can cast our response to an object we just recieved as response
  // by casting it to the type we created
  // putting the + sign infront of a literal converts it into number
  private processResponse(response: Response): Response {
    return {
      info: {...response.info},
      results: response.results.map((user: any) => (<User>{
        uuid: user.login.uuid,
        firstName: user.name.first,
        LastName: user.name.last,
        email: user.email,
        username: user.login.username,
        gender: user.gender,
        address: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.country}`,
        dateOfBirth: user.dob.date,
        phone: user.phone,
        imageUrl: user.picture.medium,
        coordinate: {
          longitude: +user.location.coordinates.longitude,
          latitude: +user.location.coordinates.latitude
        }
      }))
    }
  }

}
