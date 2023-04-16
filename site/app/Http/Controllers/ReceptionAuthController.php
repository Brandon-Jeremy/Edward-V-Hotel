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
        ->where('password',hash("sha256",$password))
        ->first();

        if(empty($result)){
            return response()->json([
                "Error" => "Incorrect username or password"
            ]);
        }

        return response()->json([
            "Eesult" => $result
        ]);

    }
}
