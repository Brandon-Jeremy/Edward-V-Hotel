<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
/**Run `composer require laravel/ui` to install Laravel's UI package.
 * Run `php artisan ui vue --auth` to generate the authentication views and routes.
 * Run `npm install && npm run dev` to compile the frontend assets. 
*/

use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyAccount;
use App\Mail\OTPVerification;
use App\Mail\ForgotPassword;


class CustomAuthController extends Controller
{
    //Not needed. Not a server rendered site.
    // public function login(){
    //     return view("auth.login");
    // }

    // public function registration(){
    //     return view("auth.registration");
    // }
    // public function login(Request $requests){
    //     return response()->json([
    //         "success" => true
    //     ]);
    // }

    public function registerUser(Request $request){
        try{
            $user=new User;
            $user->first_name=$request->first_name;
            $user->last_name=$request->last_name;
            $user->dob=$request->dob;
            // $user->nationality=NULL;
            $user->email=$request->email;

            // Validate email using regex
            if(!preg_match("/^[a-zA-Z0-9+_.-]+@(?:(gmail)|(hotmail)|(outlook)|(duck)|(pm))\.(?:(com))$/", $user->email)) {
                return response()->json(['error' => 'Invalid email format'], 400);
            }

            $user->phone_num=$request->phone_num;

            // Validate phone number using regex
            if(!preg_match("/^[\d]{7,}$/", $user->phone_num)) {
                return response()->json(['error' => 'Invalid phone number format'], 400);
            }

            $pass=$request->password;
            $user->password=hash("sha256",$pass);
            $user->points=0;
            $user->email_created_at=Carbon::now();
            $user->email_verified_at=NULL;
            $user->details=NULL;

            // Generate a random token of size 10
            $token = Str::random(10);
            $user->token = $token;
            $user->token_expiration=NULL;

            $user->save();

            $link = "http://127.0.0.1:8000/api/";
            $api = "validate-email/";
            
            $mailData = [
                'url' => $link . $api . $token
            ];

            Mail::to($user->email)->send(new VerifyAccount($mailData));
            
        }
        catch (\Exception $e) {
            // Code to handle the exception goes here
            // return response()->json(['error' => $e->getMessage()], 500);
            // return response()->json([
            //     "success" => false
            // ]);
            return response()->json([
                'error' => 'An account with this email or phone number already exists.'
            ],500);
        }
        

        return response()->json([
            "success" => true
        ]);
    }

    public function validateEmail(Request $request, $token) {
        // retrieve the user based on the token
        $user = User::where('token', $token)->first();
    
        // check if a user was found
        if (!$user) {
            return response()->json(['error' => 'Invalid token'], 400);
        }
    
        // update the email_verified_at field to mark the email as verified
        $user->email_verified_at = Carbon::now();
        $user->save();
    
        // return a success message
        return response()->json(['message' => 'Email verified successfully'], 200);
    }
    

    use AuthenticatesUsers, ThrottlesLogins;
    public function loginUser(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Add rate limiting
        $maxAttempts = 5;
        $decayMinutes = 5;
        $this->incrementLoginAttempts($request);
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);
            return response()->json([
                'success' => false,
                'message' => 'Too many login attempts. Please try again in ' . $decayMinutes . ' minute(s).',
            ]);
        }

        $hashedPassword = hash("sha256", $request->password);
        $user = User::where('email', $request->email)->where('password', $hashedPassword)->first();

        if ($user) {
            // Clear rate limiting
            $this->clearLoginAttempts($request);

            $otp =  Str::random(6);
            
            // Individual variable for each digit
            $d1 = substr($otp, 0, 1);
            $d2 = substr($otp, 1, 1);
            $d3 = substr($otp, 2, 1);
            $d4 = substr($otp, 3, 1);
            $d5 = substr($otp, 4, 1);
            $d6 = substr($otp, 5, 1);

            $mailData = [
                'first' => $d1,
                'second' => $d2,
                'third' => $d3,
                'fourth' => $d4,
                'fifth' => $d5,
                'sixth' => $d6
            ];

            Mail::to($request->email)->send(new OTPVerification($mailData));

            $otp_expiration = Carbon::now()->add(5, 'minutes');

            // Update the user's row in the database
            $user->otp = $otp;
            $user->otp_expiration = $otp_expiration;
            $user->save();


            return response()->json([
                "success" => true,
            ]);
        } else {
            // Add failed login attempt to rate limiting
            $this->incrementLoginAttempts($request);
            return response()->json([
                "success" => false,
                "message" => "Invalid email or password",
            ]);
        }
    }

    public function validateOTP(Request $request){
        $email = $request->email;
        $otp = $request->otp;
    
        $user = DB::table('users')
            ->where('email',$email)
            ->first();

        if(empty($user)){
            return response()->json([
                'success' => false,
                'error' => 'user does not exist'
            ]);
        }
    
        $otp_from_db = $user->otp;
        $expiration_date = $user->otp_expiration;
    
        if ($otp === $otp_from_db && time() <= strtotime($expiration_date)) {
            // OTP is valid and not expired
            $user_id = $user->id;
            // perform additional actions here
            return response()->json([
                'success' => true,
                'user_id' => $user_id
            ]);
        } else {
            // OTP is invalid or expired
            return response()->json([
                'success' => 'false',
                'message' => 'otp invalid or expired'
            ]);
        }
    }

    public function getEmail(Request $request){
        $email = $request->email;
        $record = DB::table('users')->where('email', $email)->first();

        if (is_null($record)) {
            return response()->json([
                "success" => false
            ]);
        } 
        else {
            return response()->json([
                "success" => true,
                "user_id" => $record->id
            ]);
        }
    }

    public function changePassword(Request $request){
        /*TODO Ask: Can I find the user based off their ID instead
         * Instead of using a query builder to find the user based off their email can the frontend send the
         * users's DB id that is autoincrement?
        */

        //How this works: Frontend sends a post request containing 2 pieces of information, the user's email
        //and the user's new password
        //If the password is the same as the one in the DB, return failure otherwise return success
        $email = $request->email;
        $oldPassword = hash('sha256',$request->oldpassword);
        $newPassword = hash("sha256",$request->newpassword);

        $found = DB::table('users')
        ->where('email',$email)
        ->where('password',$oldPassword)
        ->first();

        if(empty($found)){
            return response()->json([
                'success' => false,
                'error' => 'Incorrect email or password'
            ]);
        }

        if ($oldPassword == $newPassword){
            return response()->json([
                'success' => false,
                'error' => 'Old password and new password match'
            ]);
        }
        else{
            $newData = [
                'password' => $newPassword,
                'updated_at' => Carbon::now(),
            ];
            DB::table('users')->where('email',$email)->update($newData);
            
            return response()->json([
                "success" => true
            ]);
        }
    }

    public function forgotPassword(Request $request){
        $email = $request->email;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'error' => 'user does not exist'
            ]);
        }

        $token = $user->token;

        $link = "http://127.0.0.1:8000/api/";
        $api = "reset-password/";

        $mailData = [
            'url' => $link . $api . $token
        ];

        Mail::to($user->email)->send(new ForgotPassword($mailData));

        return response()->json([
            'success' => true,
            'message' => 'email sent'
        ]);
    }

    public function resetPassword(Request $request, $token){
        $new_password = $request->password;

        $user = DB::table('users')
        ->where('token',$token)
        ->first();

        if(empty($user)){
            return response()->json([
                'success' => false,
                'error' => 'No user found'
            ]);
        }

        $hashedPassword = hash('sha256',$new_password);

        $updated_user = DB::table('users')
        ->where('token',$token)
        ->update([
            'password' => $hashedPassword
        ]);

        return response()->json([
            'success' => true
        ]);

    }
}
