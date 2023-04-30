import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.css'],
})
export class RewardComponent implements OnInit {
  
  rewards: any[] = [];

  addReward(
    rewardName: string,
    rewardDescription: string,
    rewardImage: string
  ) {
    // Create a new reward object
    const reward = {
      name: rewardName,
      description: rewardDescription,
      image: rewardImage,
    };

    // Add the new reward to the rewards array
    this.rewards.push(reward);
  }

  // Call the addreward function to add a new reward
  ngOnInit() {
    // Test adding a new reward with valid inputs
    this.addReward(
      'Free Night Stay',
      'Stay for free one night at any of our hotels',
      'https://www.niemanlab.org/images/Viktoriaa-Liutova-e1624366176190.png'
    );
    // Test adding a new reward with a long name and description
    this.addReward(
      '10% Discount on All Bookings for a Year',
      'Get 10% off all bookings made within the next year',
      'https://www.niemanlab.org/images/Viktoriaa-Liutova-e1624366176190.png'
    );

    // Test adding a new reward with a short name and description
    this.addReward(
      'Free Breakfast',
      'Enjoy a complimentary breakfast during your stay',
      'https://www.niemanlab.org/images/Viktoriaa-Liutova-e1624366176190.png'
    );

    // Test adding a new reward with a unique name but duplicate description
    this.addReward(
      'Room Upgrade',
      'Get upgraded to a larger room at no extra charge',
      'https://example.com/reward4.jpg'
    );
    this.addReward(
      'Suite Upgrade',
      'Get upgraded to a luxurious suite at no extra charge',
      'https://example.com/reward5.jpg'
    );
    this.addReward(
      'Deluxe Room Upgrade',
      'Get upgraded to a deluxe room at no extra charge',
      'https://example.com/reward6.jpg'
    );
    this.addReward(
      'Room Upgrade',
      'Get upgraded to a larger room at no extra charge',
      'https://example.com/reward7.jpg'
    );
  }
}

// reward image
// https://www.niemanlab.org/images/Viktoriaa-Liutova-e1624366176190.png
