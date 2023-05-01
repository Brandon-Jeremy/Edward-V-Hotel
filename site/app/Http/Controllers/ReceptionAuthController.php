<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ReceptionAuthController extends Controller
{
    /**
     * Login to reception desk through existing account
     * @param Request username & password
     * @return JSONResponse with success or failure and with special access flag
     */
    public function receptionLogin(Request $request){
        $username = $request->username;
        $password = $request->password;

        $result = DB::table('employee')
        ->select('special_access')
        ->where('username',$username)
        ->where('password',$password)
        ->first();

        if(empty($result)){
            return response()->json([
                "Error" => "Incorrect username or password"
            ]);
        }

        return response()->json([
            "Result" => $result
        ]);

    }

    /**
     * A way for the admins to change a password of any account in case of data leaks
     * @param Request Username, new password
     * @return JSONResponse Success or failure. If password is unchanged, will return 0
     * otherwise 1
     */
    public function receptionChangePassword(Request $request){
        //This function will only be used by admins of the system

        $username = $request->username;
        $password = $request->password;

        $userexists = DB::table('employee')
        ->where('username',$username)
        ->first();

        if(empty($userexists)){
            return response()->json([
                "Error" => "Username doesn't exist"
            ]);
        }
        else{
            $update = DB::table('employee')
            ->where('username',$username)
            ->update([
                "password" => hash("sha256", $password)
            ]);

            if($update == 1){
                DB::table('employee')
                ->where('username',$username)
                ->update([
                    "updated_at" => Carbon::now()
                ]);
            }

            return response()->json([
                "Update Success" => $update
            ]);
        }

    }
}
