import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.css'],
})
export class AvailableRoomsComponent implements OnInit {
  rooms: any[] = [];

  addRoom(
    roomName: string,
    roomView: string,
    roomDescription: string,
    roomImage: string
  ) {
    // Create a new room object
    const room = {
      name: roomName,
      view: roomView,
      description: roomDescription,
      image: roomImage,
    };

    // Add the new room to the rooms array
    this.rooms.push(room);
  }

  // Call the addRoom function to add a new room
  ngOnInit() {
    this.addRoom(
      'Single',
      'beach',
      'A luxurious suite with a king-size bed and a stunning view',
      'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Studio-King-Bed.jpg'
    );
    this.addRoom(
      'Double',
      'beach',
      'A spacious room with two separate areas and a great view of the city',
      'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg'
    );
    this.addRoom(
      'Suite',
      'beach',
      'A comfortable room with two double beds and all the necessary amenities',
      'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg'
    );
    this.addRoom(
      'Single',
      'city',
      'A spacious room with two separate areas and a great view of the city',
      'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg'
    );
    this.addRoom(
      'Double',
      'city',
      'A comfortable room with two double beds and all the necessary amenities',
      'https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg'
    );
   }
}

// room images

// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2023/02/Deluxe-Two-Room-Corner.jpg
// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Deluxe-Double3.jpg
// https://d3rg18dos0rgue.cloudfront.net/wp-content/uploads/sites/3/2017/12/Studio-King-Bed.jpg

// addRoom(roomName: string, roomDescription: string, roomImage: string) {
//   // Create a new room element
//   const roomElement = document.createElement('div');
//   roomElement.classList.add('room');

//   // Add the room image
//   const imageElement = document.createElement('img');
//   imageElement.setAttribute('src', roomImage);
//   imageElement.setAttribute('alt', roomName);
//   roomElement.appendChild(imageElement);

//   // Add the room name
//   const nameElement = document.createElement('h2');
//   nameElement.textContent = roomName;
//   roomElement.appendChild(nameElement);

//   // Add the room description
//   const descriptionElement = document.createElement('p');
//   descriptionElement.textContent = roomDescription;
//   roomElement.appendChild(descriptionElement);

//   // Append the room element to the room container
//   const roomContainer = document.getElementById('room-container');
//   roomContainer.appendChild(roomElement);
// }
