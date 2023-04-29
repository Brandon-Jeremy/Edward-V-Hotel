<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\rewardController;
use App\Http\Controllers\OnlineReservationController;
use App\Http\Controllers\WalkInBookingController;
use App\Http\Controllers\HousekeepingController;
use App\Http\Controllers\FinancesController;
use App\Http\Controllers\ReceptionAuthController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\RoomInfoController;
use App\Http\Controllers\GiftcardController;
use App\Http\Controllers\WaitinglistController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
//Notes for brandon. Routes go in api.php not web.php
//The API will take input values from JS(axios)
// Route::get('/login',[CustomAuthController::class,'login']);
// Route::get('/registration',[CustomAuthController::class,'registration']);

//This one works. Above are not connected to anything
Route::post('/register-user',[CustomAuthController::class,'registerUser'])->name('register-user');
Route::post('/login-user',[CustomAuthController::class,'loginUser'])->name('login-user');

Route::post('/request-email',[CustomAuthController::class,'getEmail'])->name('request-email');
Route::post('/change-password',[CustomAuthController::class,'changePassword'])->name('change-password');

Route::post('/validate-email/{token}',[CustomAuthController::class,'validateEmail'])->name('validate-email');
Route::post('/validate-otp',[CustomAuthController::class,'validateOTP'])->name('validate-otp');

//To be done like this with token, used to send to email
Route::post('/change-pass/{token}',[CustomAuthController::class,'changePass'])->name('change-pass');

//Authenticated APIs
Route::get('/get-rewards',[rewardController::class,'getRewards'])->name('get-rewards');
Route::post('/purchase-reward',[rewardController::class,'purchaseReward'])->name('purchase-reward');
Route::post('/calculate-points',[rewardController::class,'calculatePoints'])->name('calculate-points');
Route::post('/user-rewards',[rewardController::class,'userRewards'])->name('user-rewards');
Route::post('/use-reward',[rewardController::class,'useReward'])->name('use-reward');
 
Route::post('/create-reservation',[OnlineReservationController::class,'createReservation'])->name('create-reservation');

Route::post('/get-available',[WalkInBookingController::class,'fetchAvailable'])->name('get-available');
Route::post('/add-user',[WalkInBookingController::class,'addUser'])->name('add-user');
Route::post('/book-room',[WalkInBookingController::class,'bookRoom'])->name('book-room');
Route::get('/get-reserved',[WalkInBookingController::class,'getReserved'])->name('get-reserved');
Route::post('/check-in',[WalkInBookingController::class,'checkIn'])->name('check-in');
Route::get('/show-checkout',[WalkInBookingController::class,'displayCheckOut'])->name('show-checkout');
Route::post('/check-out',[WalkInBookingController::class,'checkOut'])->name('check-out');
Route::get('/late-checkout',[WalkInBookingController::class,'lateCheckout'])->name('late-checkout');
Route::post('/extend-stay',[WalkInBookingController::class,'extendStay'])->name('extend-stay');
Route::post('/extra-charge',[WalkInBookingController::class,'extraCharge'])->name('extra-charge');
Route::post('/show-charges',[WalkInBookingController::class,'showCharges'])->name('show-charges');
Route::post('/pay-extracharge', [WalkInBookingController::class, 'payExtraCharges'])->name('pay-extracharge');

//Reception Authentication
Route::post('/reception-login',[ReceptionAuthController::class,'receptionLogin'])->name('reception-login');
Route::post('/reception-changepass',[ReceptionAuthController::class,'receptionChangePassword'])->name('reception-changepass');

//HouseKeeping
Route::get('/needs-service',[HousekeepingController::class,'getDirty'])->name('needs-service');
Route::post('/set-clean',[HousekeepingController::class,'setClean'])->name('set-clean');

//Finances & Hotel Information
Route::post('/financial-data',[FinancesController::class,'computeFinances'])->name('financial-data');
Route::post('/occupancy-data',[FinancesController::class,'occupancyData'])->name('occupancy-data');

//Send emails
Route::post('/test-email',[EmailController::class,'testEmail'])->name('test-email');
Route::post('/email-current',[EmailController::class,'emailCurrent'])->name('email-current');
Route::post('/email-all',[EmailController::class,'emailAll'])->name('email-all');
Route::post('/send-mail-to-hotel',[EmailController::class,'sendEmailToHotel'])->name('send-mail-to-hotel');

//PDF Export
Route::post('/generate-pdf',[ExportController::class,'generatePDF'])->name('generate-pdf');

//Room Information Website
Route::get('/room-info',[RoomInfoController::class,'roomInfo'])->name('room-info');
Route::post('/room-availability',[RoomInfoController::class,'roomAvailability'])->name('room-availability');

Route::post('/view-reservations',[OnlineReservationController::class,'viewReservations'])->name('view-reservations');

//Giftcards
// Route::post('/create-giftcard',[GiftcardController::class,'createGiftcard'])->name('create-giftcard');
Route::post('/purchase_giftcard',[GiftcardController::class,'purchaseGiftcard'])->name('purchase-giftcard');
Route::post('/redeem-giftcard',[GiftcardController::class,'redeemGiftcard'])->name('redeem-giftcard');

//Waitinglist
Route::post('/add-waitinglist',[WaitinglistController::class,'addtoWaitinglist'])->name('add-waitinglist');

//Online Reservations
Route::post('/create-reservation',[OnlineReservationController::class,'createReservation'])->name('create-reservation');
Route::post('/cancel-reservation',[OnlineReservationController::class,'cancelReservation'])->name('cancel-reservation');