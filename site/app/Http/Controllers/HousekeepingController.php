<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\WaitingListNotification;

class HousekeepingController extends Controller
{
    /**
     * Find all rooms that needs room service after checkout
     * @param None GET request
     * @return JSONResponse Response of rooms that need service
     */
    public function getDirty(){
        $status = 'dirty';

        $service = DB::table('room')
            ->select('room_number','floor','id','status')
            ->where('status',$status)
            ->get();

        return response()->json([
            $service
        ]);

        /**
         * Used to merge data, don't uncomment.
         * $roomNumber = $service->pluck('room_number')->toArray();
         * $roomFloor = $service->pluck('floor')->toArray();
         * $roomId = $service->pluck('id')->toArray();
         */

        return response()->json([
            'Room Number' => $roomNumber,
            'Room Floor' => $roomFloor,
            'Room ID' => $roomId,
        ]);
    }
    /**
     * @param Request roomID to distinguish what room to set as clean
     * @return JSONResponse Success after the function is complete
     */
    public function setClean(Request $request){
        $roomid = $request->id;

        $reservation = DB::table('reservation')
        ->where('room_id',$roomid)
        ->where('activity','pending')
        ->first();

        if(!empty($reservation)){
            DB::table('room')
            ->where('id', $roomid)
            ->update(['status' => 'reserved']);

            return response()->json([
                'success' => true,
                'message' => 'cleaned and set as reserved'
            ]);
        }

        DB::table('room')
            ->where('id', $roomid)
            ->update(['status' => 'available']);

        //Get all users to email once room is available
        $users = DB::table('waitinglist')
        ->get();

        $user_id = $users->pluck('user_id')->toArray();

        foreach($user_id as $user_id){
            $email = DB::table('users')
            ->select('email')
            ->where('id',$user_id)
            ->first();

            if(!empty($email)){
                Mail::to($email->email)->send(new WaitingListNotification);
                DB::table('waitinglist')->where('user_id', $user_id)->delete();
            }
            
        }


        return response()->json([
            'success' => true,
            'message' => 'Room cleaned & email sent'
        ]);
    }
}
