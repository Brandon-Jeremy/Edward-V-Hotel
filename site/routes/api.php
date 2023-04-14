<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\rewardController;
use App\Http\Controllers\OnlineReservationController;
use App\Http\Controllers\WalkInBookingController;
use App\Http\Controllers\HousekeepingController;
use App\Http\Controllers\FinancesController;

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

//To be done like this with token, used to send to email
Route::post('/change-pass/{token}',[CustomAuthController::class,'changePass'])->name('change-pass');

//Authenticated APIs
Route::get('/get-rewards',[rewardController::class,'getRewards'])->name('get-rewards');
Route::post('/purchase-reward',[rewardController::class,'purchaseReward'])->name('purchase-reward');
 
Route::post('/create-reservation',[OnlineReservationController::class,'createReservation'])->name('create-reservation');

Route::post('/get-available',[WalkInBookingController::class,'fetchAvailable'])->name('get-available');
Route::post('/add-user',[WalkInBookingController::class,'addUser'])->name('add-user');
Route::post('/book-room',[WalkInBookingController::class,'bookRoom'])->name('book-room');
Route::get('/get-reserved',[WalkInBookingController::class,'getReserved'])->name('get-reserved');
Route::post('/check-in',[WalkInBookingController::class,'checkIn'])->name('check-in');
Route::get('/show-checkout',[WalkInBookingController::class,'displayCheckOut'])->name('show-checkout');
Route::post('/check-out',[WalkInBookingController::class,'checkOut'])->name('check-out');
Route::get('/late-checkout',[WalkInBookingController::class,'lateCheckout'])->name('late-checkout');
// Route::post('/extend-stay',[WalkInBookingController::class,'extendStay'])->name('extend-stay');

//HouseKeeping
Route::get('/needs-service',[HousekeepingController::class,'getDirty'])->name('needs-service');
Route::post('/set-clean',[HousekeepingController::class,'setClean'])->name('set-clean');

//Finances & Hotel Information
Route::post('/financial-data',[FinancesController::class,'computeFinances'])->name('financial-data');
Route::post('/occupancy-data',[FinancesController::class,'occupancyData'])->name('occupancy-data');