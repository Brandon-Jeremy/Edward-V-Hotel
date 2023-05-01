import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly getRoomsUrl = 'http://localhost:8080/room-availability';

  private roomAvailability: number[] = [];
  private roomType:string = '';
  private roomView:string = ''; 

  constructor(private http: HttpClient) {}

  checkAvailability(checkInValue: string, checkOutValue: string, roomType: string, view: boolean): Observable<number[]> {
    const params = {
      datefrom: checkInValue,
      dateto: checkOutValue,
      type: roomType,
      view: view,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.get<number[]>(`${this.getRoomsUrl}/room-availability`, {
      params: params,
      headers: headers,
    });

  }

  setAvailableRooms(availableRooms:number[] ) {
    this.roomAvailability = availableRooms;
  }

  getRoomCount(){
    return this.roomAvailability.length;
  }

  setRoomType(newRoomType:string){
    this.roomType = newRoomType;
  }

  getRoomType(){
    return this.roomType;
  }

  setView(newView:string){
    this.roomView = newView;
  }

  getView(){
    return this.roomView;
  }

}