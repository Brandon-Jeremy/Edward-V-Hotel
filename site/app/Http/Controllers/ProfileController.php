<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ProfileController extends Controller
{
    public function deleteAccount(Request $request){
        $email = $request->email;
        $password = $request->password;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'success' => false,
                'error' => 'User does not exist'
            ]);
        }

        $correctPassword = DB::table('users')
        ->where('email',$email)
        ->where('password',hash('sha256',$password))
        ->first();

        if(empty($correctPassword)){
            return response()->json([
                'success' => false,
                'error' => 'Passwords do not match'
            ]);
        }

        $token = Str::random(5);
        $new_email = $token."deleted@".$email;

        DB::table('users')
        ->where('email',$email)
        ->update([
            'updated_at' => Carbon::now(),
            'email' => $new_email,
            'phone_num' => NULL
        ]);

        return response()->json([
            'success' => true,
        ]);

    }

    public function editAccount(Request $request) {

        $email = $request->email;

        $user = DB::table('users')
        ->where('email',$email)
        ->first();

        if(empty($user)){
            return response()->json([
                'success' => false,
                'error' => 'user does not exist'
            ]);
        }

        $pass = $request->password;

        $password = DB::table('users')
        ->where('email',$email)
        ->where('password',hash('sha256',$pass))
        ->first();

        if(empty($password)){
            return response()->json([
                'success' => false,
                'error' => 'password does not match'
            ]);
        }

        $user_id = $user->id;

        $updatedFields = [];
        if ($request->has('first_name')) {
            $updatedFields['first_name'] = $request->first_name;
        }
        if ($request->has('last_name')) {
            $updatedFields['last_name'] = $request->last_name;
        }
        if ($request->has('new_email')) {

            $emailfound = DB::table('users')
            ->where('email',$request->new_email)
            ->where('id','!=',$user_id)
            ->first();

            if(!empty($emailfound)){
                return response()->json([
                    'success' => false,
                    'error' => 'Duplicate email found'
                ]);
            }

            $updatedFields['email'] = $request->new_email;
        }
        if ($request->has('phone_number')) {

            $phonefound = DB::table('users')
            ->where('phone_num',$request->phone_number)
            ->where('id','!=',$user_id)
            ->first();

            if(!empty($phonefound)){
                return response()->json([
                    'success' => false,
                    'error' => 'Duplicate phone number found'
                ]);
            }

            $updatedFields['phone_num'] = $request->phone_number;
        }
        if ($request->has('dob')) {
            $updatedFields['dob'] = $request->dob;
        }

        if (count($updatedFields) === 0) {
            return response()->json([
                'success' => false,
                'error' => 'No fields to update',
            ]);
        }
    
        $success = DB::table('users')
        ->where('id',$user_id)
        ->update($updatedFields);

        $value = ($success == 1)?true:false;
    
        return response()->json([
            'success' => $value
        ]);
    }
}
