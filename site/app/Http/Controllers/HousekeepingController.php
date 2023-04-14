<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        DB::table('room')
            ->where('id', $roomid)
            ->update(['status' => 'available']);

        return response()->json([
            'success' => true,
            'message' => 'Room cleaned'
        ]);
    }
}
