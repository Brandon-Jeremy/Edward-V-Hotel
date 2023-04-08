<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomAuthController;

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
 



