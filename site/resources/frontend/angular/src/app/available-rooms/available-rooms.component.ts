import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
})
export class AvailableRoomsComponent implements OnInit {
  roomImageUrl: string = '';
  roomType: string = '';
  roomView: string = '';
  roomDescription: string = '';

  public noRoomsAvailable = false;
  public roomsAvailable = false;
  public availableRooms: Number = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    const roomCount = this.bookingService.getRoomCount();
    if (roomCount <= 0) {
      this.noRoomsAvailable = true;
    } else {
      this.roomsAvailable = true;
      this.availableRooms = roomCount;
    }

    this.roomView = this.bookingService.getView();
    this.roomType = this.bookingService.getRoomType();
    if (this.roomType == 'Single') {
      this.roomImageUrl =
        'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg';
      this.roomDescription =
        'This cozy single room is perfect for solo travelers or couples looking for a comfortable stay. Enjoy a stunning view of the city or the beach, and all the necessary amenities for a relaxing stay.';
    } else if (this.roomType == 'Double') {
      this.roomImageUrl =
        'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg';
      this.roomDescription =
        'Our spacious double room is perfect for couples or small families. Enjoy a comfortable king-sized bed, a breathtaking view of the city or the beach, and all the necessary amenities for a luxurious stay.';
    } else {
      // Suite
      this.roomImageUrl =
        'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Studio-King-Bed.jpg';
      this.roomDescription =
        'Our luxurious suite is perfect for those seeking a high-end experience. Enjoy a spacious living area, a king-sized bed, stunning views of the city or the beach, and all the necessary amenities for a truly indulgent stay.';
    }
  }
}

// room images

// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg
// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg
// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Studio-King-Bed.jpg

// rooms: any[] = [];

// ngOnInit() {
// addRoom(
//   roomName: string,
//   roomView: string,
//   roomDescription: string,
//   roomImage: string
// ) {
//   // Create a new room object
//   const room = {
//     name: roomName,
//     view: roomView,
//     description: roomDescription,
//     image: roomImage,
//   };

//   // Add the new room to the rooms array
//   this.rooms.push(room);
// }
//}

// Call the addRoom function to add a new room

//   this.addRoom(
//     'Single',
//     'beach',
//     'A luxurious suite with a king-size bed and a stunning view',
//     'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Studio-King-Bed.jpg'
//   );
//   this.addRoom(
//     'Double',
//     'City',
//     'A spacious room with two separate areas and a great view of the city',
//     'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg'
//   );
//   this.addRoom(
//     'Suite',
//     'beach',
//     'A comfortable room with two double beds and all the necessary amenities',
//     'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg'
//   );

//   this.addRoom(
//     'Single',
//     'city',
//     'A spacious room with two separate areas and a great view of the city',
//     'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg'
//   );
//   this.addRoom(
//     'Double',
//     'city',
//     'A comfortable room with two double beds and all the necessary amenities',
//     'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg'
//   );
