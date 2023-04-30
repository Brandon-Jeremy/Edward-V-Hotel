# Hotel Management System
This is a full Hotel Management system consisting of a website written with Angular Framework using HTML, CSS, and Typescript. The backend was written in PHP's framework Laravel and a reception desktop app written using Electron.JS with HTML, CSS, and JavaScript.

The system is composed of several different systems each of which work together to reach and meet a common goal.

# Hotel Frontpage
![Frontpage](https://cdn.discordapp.com/attachments/1102221189973278842/1102264185628405790/image.png)

# Login Page
![Login](https://cdn.discordapp.com/attachments/1102221189973278842/1102265694629933188/image.png)

# User's profile
![Profile](https://media.discordapp.net/attachments/1102221189973278842/1102268778353528852/image.png?width=1440&height=696)

# Room exploration
![Rooms](https://media.discordapp.net/attachments/1102221189973278842/1102250436234322000/image.png?width=1440&height=567)

# Contact Form
![Contact](https://cdn.discordapp.com/attachments/1102221189973278842/1102250753013329930/image.png)

# Website Roaming
![LandingPage](https://cdn.discordapp.com/attachments/1102221189973278842/1102266128488743024/lv_0_20230430190234.gif)


The different systems consist of the following:

# Website

## Custom Authentication System
The system allows users to register accounts with unique emails and phone numbers. Each account has its passowrd safely encrypted within its database row. Alongside information provided by the user, additional information is also provided such as 
- A unique token for account validation
- A One time password generated per login for additional security (2FA)
- A Logging system to identify when an account was made

## User Profile
Users will also have access to their own profile in which they can edit specific information as well as access user specific information such as reservations made in their name as well as rewards that are left unclaimed.

## Booking System
A booking system is set into place that allows users with accounts to book or reserve rooms depending on its availability. Guests are also able to edit their reservation in the event changes are to be made.

After a reservation, guests are awarded with points that they can benefit from in the shop. Guests are also notified of reservations and point milestones for better user experience.

## Waiting List
In the event all rooms the guest would like to book are taken, he or she may want to be added to a waiting list in which they become notified once any room at the hotel become available for booking. 

This system has been made in a fair manner to ensure that no guest is prioritized in the waiting list. It functions on a first come, first serve basis where all guests are notified at roughly the same time to ensure fairness.

## Gifts & Rewards
The gift code-based system is also in place for users to purchase gift cards to store points for later.

A gift code based system is also in place for users to purchase gift cards to store points for later times. All this information is safely stored away in the database as well as kept log of for security purposes. All details of redemption is also tracked and measured before usage to make sure no user can take advantage of continuous giftcard uses. 

Finally, user's will be notified of their giftcard token for better user experience.

---
The reward system works in a similar way in which a user can purchase rewards using points gathered. A user may also want to gift these rewards to another member that has an account on the website in which they are allowed to do so. 

The points are carefully managed so ensure users are awarded and lose the correct number of points when certain functionalities are used.

# Desktop App

## Reception Desk
The Reception Desk manages all walk-in bookings as well as room service extra charges and housekeeping for cleaning rooms and setting them as available once they are clean. Room statuses are automatically updated. Warning systems are in place in the event guests are late to checkout or are checking out before paying extra charges. Guests can also opt to extend their stay. The system ensures that the rooms never conflict in dates.

## Warning systems
Warning systems are in place for late checkouts with the option to extend stay as well as for guests with outstanding charges. The room will not be able to be checked out unless an override command is given in the event a guest leaves without paying for extra charges.

## Housekeeping
Room notifications depending on status with the option to set clean once a room is clean

## Reception Desktop App
The Reception Desktop App can be accessed via 2 accounts, admin or employee which have different functionalities.

## Financial Reports
The backend also manages financial reports in a neatly formatted PDF to display the performance of the hotel.

# Email Notifications
Users can send emails to the hotel to inquire about it or any questions left unanswered. The system sends emails to the users for reasons such as bookings, rewards milestones, One-time passwords, gift card codes, and other reasons.

- Verify Account
  ![Verify Account](https://media.discordapp.net/attachments/1102221189973278842/1102256169944358993/image.png?width=632&height=701)
- One Time Password
  ![One Time Password](https://media.discordapp.net/attachments/1102221189973278842/1102259093730754663/image.png?width=522&height=701)
- Waiting List
  ![Waiting List Notification](https://media.discordapp.net/attachments/1102221189973278842/1102256469346361424/image.png?width=533&height=701)
- Reward Notification
  ![Reward Notification](https://media.discordapp.net/attachments/1102221189973278842/1102256669007806554/image.png?width=561&height=701)
- Reservation Notification
  ![Reservation Notification](https://media.discordapp.net/attachments/1102221189973278842/1102257059942109274/image.png?width=561&height=701)
- Point Milestone
  ![Points Milestone](https://media.discordapp.net/attachments/1102221189973278842/1102257515506442330/image.png?width=582&height=701)
- Message to Guests
  ![Message to Guest](https://media.discordapp.net/attachments/1102221189973278842/1102257731630534718/image.png?width=606&height=701)
- Giftcode Creation
  ![Giftcode Generation](https://media.discordapp.net/attachments/1102221189973278842/1102258082085609542/image.png?width=583&height=701)
- Reward Redeemed
  ![Reward Redemption](https://media.discordapp.net/attachments/1102221189973278842/1102258256765796402/image.png?width=647&height=701)
- Message from Hotel Guest
  ![Message from Hotel Guest](https://media.discordapp.net/attachments/1102221189973278842/1102258430909108224/image.png?width=618&height=701)
- Provide Feedback
  ![Provide Feedback](https://media.discordapp.net/attachments/1102221189973278842/1102258546269237329/image.png?width=545&height=701)
