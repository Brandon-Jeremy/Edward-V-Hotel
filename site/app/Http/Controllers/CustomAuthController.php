<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\RegisteredUser;
use Illuminate\Support\Facades\DB;

use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
/**Run `composer require laravel/ui` to install Laravel's UI package.
 * Run `php artisan ui vue --auth` to generate the authentication views and routes.
 * Run `npm install && npm run dev` to compile the frontend assets. 
*/

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

            $user=new RegisteredUser;
            $user->first_name=$request->first_name;
            $user->last_name=$request->last_name;
            $user->dob=$request->dob;
            // $user->nationality=NULL;
            $user->email=$request->email;
            $user->phone_num=$request->phone_num;
            $pass=$request->password;
            $user->password=hash("sha256",$pass);
            $user->points=0;
            $user->email_created_at=Carbon::now();
            $user->email_verified_at=NULL;
            $user->details=NULL;

            $user->save();
        }
        catch (\Exception $e) {
            // Code to handle the exception goes here
            // return response()->json(['error' => $e->getMessage()], 500);
            return response()->json([
                "success" => false
            ]);
        }
        

        return response()->json([
            "success" => true
        ]);
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
        $user = RegisteredUser::where('email', $request->email)->where('password', $hashedPassword)->first();

        if ($user) {
            // Clear rate limiting
            $this->clearLoginAttempts($request);
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


    public function getEmail(Request $request){
        $email = $request->email;
        $record = DB::table('registered_users')->where('email', $email)->first();

        if (is_null($record)) {
            return response()->json([
                "success" => false
            ]);
        } 
        else {
            return response()->json([
                "success" => true
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
        $newPassword = hash("sha256",$request->password);
        $password = DB::table('registered_users')->where('email', $email)->value('password');
        if ($password == $newPassword){
            return response()->json([
                "success" => false
            ]);
        }
        else{
            $newData = [
                'password' => $newPassword,
                'updated_at' => Carbon::now(),
            ];
            DB::table('registered_users')->where('email',$email)->update($newData);
            
            return response()->json([
                "success" => true
            ]);
        }
    }
}
