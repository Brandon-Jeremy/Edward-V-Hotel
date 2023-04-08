<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\RegisteredUser;
use Illuminate\Support\Facades\DB;


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

    public function loginUser(Request $request){
    $hashedPassword = hash("sha256", $request->password);

    $users = RegisteredUser::all();
    foreach ($users as $user){
        if ($user->email == $request->email && $user->password == $hashedPassword) {
            return response()->json([
                "success" => true
            ]);
        }
    }
    return response()->json([
        "success" => false
    ]);
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
