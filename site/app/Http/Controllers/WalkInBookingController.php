<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

use App\Models\WalkInUser;
use App\Models\Rooms;

//Used for emailing
use App\Mail\MyCustomEmail;
use Illuminate\Support\Facades\Mail;

class WalkInBookingController extends Controller
{
    public function addUser(Request $request){
        $first_name = $request->firstname;
        $last_name = $request->lastname;
        $gender = $request->gender;
        $dob = $request->dob;
        $nationality = $request->nationality;
        $phone_num = $request->phonenum;

        $user = WalkInUser::where('phone_num', $phone_num)
        ->where('first_name', $first_name)
        ->where('last_name', $last_name)
        ->pluck('id')
        ->first();

        $id = $user;

        if(!$id){
            //User is not in the table
            $token = Str::random(10);
            $newUser = DB::table('users')->insertGetId([
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),

                'first_name' => $first_name,
                'last_name'  => $last_name,
                // 'gender' => $gender,
                'dob' => $dob,
                'nationality' => $nationality,
                'phone_num' => $phone_num,
                'email' => NULL,
                'password' => NULL,
                'points' => 0,
                'details' => NULL,
                'email_created_at' => NULL,
                'email_verified_at' => NULL,
                'token' => $token,
                'token_expiration' => NULL
            ]);
            
            return response()->json([
                'success' => true,
                'user_id' => $newUser,
            ]);
        }
        return response()->json([
            'success' => false,
            'user_id' => $id,
        ]);
        
    }

    public function fetchAvailable(Request $request){
        $roomtype = $request->roomtype;
        $view = $request->view;
        $status = "available";

        $result = DB::table('room')->select('type','floor','room_number','view')
            ->where('type', $roomtype)
            ->where('status', $status)
            ->where('view',$view)
            ->get();

        $prices = DB::table('room_prices')->select('price','capacity')
            ->where('view', $view)
            ->where('type', $roomtype)
            ->get();

        $availableRooms = $result->merge($prices);

        return response()->json($availableRooms);
    }
        

    public function bookRoom(Request $request){
        $user_id = $request->id;
        $room_floor = $request->floor;
        $room_number = $request->number;
        $date_from = $request->datefrom;
        $date_to = $request->dateto;
        $user_type = "Walk In";
        
        // $user_id = "2";
        // $room_floor = "2";
        // $room_number = "2";
        // $date_from = "2023-04-11";
        // $date_to = "2023-04-15";
        // $user_type = "Walk in";
        $activity = "active";

        $room = DB::table('room')->select('id')
        ->where('floor', $room_floor)
        ->where('room_number', $room_number)
        ->first();

        $reservation = DB::table('reservation')
        ->where('date_from', $date_from)
        ->where('date_to', $date_to)
        ->where('room_id', $room->id)
        ->where('user_id', $user_id)
        ->where('user_type', $user_type)
        ->first();

        // return response()->json([
        //     'value' => $reservation
        // ]);
        
        if(empty($reservation)){
            // If reservation is not found in the table, add it
            $reservation_id = DB::table('reservation')->insertGetId([
                'date_from' => $date_from,
                'date_to' => $date_to,
                'room_id' => $room->id,
                'user_id' => $user_id,
                'user_type' => $user_type,
                'activity' => $activity
            ]);
        
            // Update the room status to booked
            DB::table('room')
                ->where('id', $room->id)
                ->update(['status' => 'busy']);
        
            // Return the success message
            return response()->json([
                'success' => true,
                'message' => 'Reservation added successfully.',
                'reservation_id' => $reservation_id
            ]);
        } 
        else {
            // If reservation already exists, return an error message
            return response()->json([
                'success' => false,
                'error' => 'Reservation already exists.'
            ]);
        }

    }

    // public function getReserved(){
    //     $roomInfo = DB::table('room')->select('room_number','floor','id')
    //     ->where('status', 'reserved')
    //     ->get();

    //     $reservationInfo = DB::table('reservation')->select('user_id','date_from','date_to')
    //     ->where('activity', 'active')
    //     ->get();

    //     $userInformation = DB::table('users')->select('first_name','last_name')
    //     ->where('id', $reservationInfo->user_id)
    //     ->first();



    // }
    // public function getReserved(){
    //     $roomInfo = DB::table('room')
    //         ->select('room_number','floor','id')
    //         ->where('status', 'reserved')
    //         ->get();

    //     // return response()->json([
    //     //     'result' => $roomInfo
    //     // ]);
    
    //     $reservationInfo = DB::table('reservation')
    //         ->select('user_id','date_from','date_to')
    //         ->where('activity', 'active')
    //         ->get();

    //     // return response()->json([
    //     //     'result' => $reservationInfo
    //     // ]);
    
    //     $userInformation = DB::table('users')
    //         ->select('id', 'first_name','last_name')
    //         ->whereIn('id', $reservationInfo->pluck('user_id')->toArray())
    //         ->get();
    //         // ->keyBy('id');

    //     // return response()->json([
    //     //     'result' => $userInformation
    //     // ]);    
    // }
    public function getReserved(){
        $roomInfo = DB::table('room')
            ->select('room_number','floor','id')
            ->where('status', 'reserved')
            ->get();


        // var_dump($roomInfo);die;
        // return response()->json([
        //     'result' => $roomInfo
        // ]);
    
        $reservationInfo = DB::table('reservation')
            ->select('room_id', 'user_id','date_from','date_to')
            ->where('activity', 'pending')
            ->get();

        // return response()->json([
        //     'result' => $reservationInfo
        // ]);
        
        $userInformation = DB::table('users')
            ->select('id', 'first_name','last_name')
            ->whereIn('id', $reservationInfo->pluck('user_id')->toArray())
            ->get();

        // return response()->json([
        //     'result' => $userInformation
        // ]);
            
            $mergedData = $roomInfo->map(function ($room) use ($reservationInfo, $userInformation) 
            { 
                $reservation = $reservationInfo->firstWhere('room_id', $room->id); 
                // var_dump($reservation);die;
                $user = $userInformation->firstWhere('id',$reservation->user_id); 
                
                return [ 
                    'room_number' => $room->room_number, 
                    'floor' => $room->floor, 
                    'user' => 
                        [ 
                            'id' => $user->id, 
                            'first_name' => $user->first_name, 
                            'last_name' => $user->last_name 
                        ], 
                            'date_from' => $reservation->date_from, 
                            'date_to' => $reservation->date_to 
                    ];
            }); 
                        
                return $mergedData; 

    }

    public function checkIn(Request $request){
        $room_floor = $request->floor;
        $room_number = $request->number;
    
        $roomid = DB::table('room')
            ->select('id')
            ->where('room_number', $room_number)
            ->where('floor',$room_floor)
            ->first();

        // return response()->json([
        //     'roomID' => $roomid
        // ]);
    
        DB::table('room')
        ->where('id', $roomid->id)
        ->update(['status' => 'busy']);

        //TODO: Change pending to active as well

        DB::table('reservation')
        ->where('activity','pending')
        ->where('room_id',$roomid->id)
        ->update(['activity' => 'active']);

        return response()->json([
            'success' => true
        ]);
    }

    /**
     * Display rooms that can be checked out on the reception desk
     * @param None displayCheckOut is a GET request
     * @return JsonResponse A JSON returning the room_id, id, activity, floor, room_number
     */
    public function displayCheckOut(){
        $date = Carbon::now()->format('Y-m-d');
        $checkOuts = DB::table('reservation')
            ->select('room_id','activity','id')
            ->where('date_to', $date)
            ->get();
    
        $roomIds = $checkOuts->pluck('room_id')->toArray();
    
        $rooms = DB::table('room')
            ->select('floor','room_number', 'id')
            ->whereIn('id', $roomIds)
            ->get();
    
        $checkoutsWithRooms = collect();
    
        foreach($checkOuts as $checkout) {
            $room = $rooms->firstWhere('id', $checkout->room_id);
            $checkout->floor = $room->floor;
            $checkout->room_number = $room->room_number;
            $checkoutsWithRooms->push($checkout);
        }
    
        return response()->json([
            'Checkouts' => $checkoutsWithRooms,
        ]);
    }
    

    /**
     * Check out guest from user.
     * Set room activity to inactive after checkout.
     * Set room status to dirty if the activity was set as available.
     * Set room status to available if the activity was set as pending.
     *
     * @param Request $request The HTTP request object.
     * @return JsonResponse A JSON response with a message according to the updated activity and status.
     */
    public function checkOut(Request $request){
        //TODO: Ask this, should app send me roomid or table id?
        //TODO: Override checkout

        $roomId = $request->roomid;
        $id = $request->id; //reservation id

        $reservations = DB::table('reservation')
        ->select('activity','user_id')
        ->where('room_id', $roomId)
        ->where('id', $id)
        ->whereIn('activity', ['active', 'pending'])
        ->first();

        if(empty($reservations)){
            return response()->json([
                "Error" => "No reservation found"
            ]);
        }


        //Find the user_id
        $userid = $reservations->user_id;
        $additionalCharges = DB::table('additional_charges')
            ->where('room_id', $roomId)
            ->where('user_id', $userid)
            ->where('paid', 0)
            ->get();

        if ($additionalCharges->count() > 0) {
            // There are unpaid additional charges for the given room & guest
            return response()->json([
                "Error" => "Outstanding charges unpaid"
            ]);
        }  
        // var_dump($reservations);

        $getemail = DB::table('users')
        ->select('email')
        ->where('id',$userid)
        ->first();

        $email = $getemail->email;

        if ($reservations && $reservations->activity === 'active') {
            DB::table('reservation')
            ->where('id', $id)
            ->update(['activity' => 'inactive']);

            DB::table('room')
            ->where('id',$roomId)
            ->update(['status' => 'dirty']);

            if(!empty($email)){
                Mail::to($email)->send(new MyCustomEmail);
            }

            return response()->json([
                'success' => true,
                'activity' => 'inactive',
                'status' => 'dirty'
            ]);
        }
        elseif($reservations && $reservations->activity === 'pending'){
            DB::table('reservation')
            ->where('id', $id)
            ->update(['activity' => 'inactive']);

            DB::table('room')
            ->where('id',$roomId)
            ->update(['status' => 'available']);

            return response()->json([
                'success' => true,
                'activity' => 'inactive',
                'status' => 'available'
            ]);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'No reservation found'
            ]);
        }
    }

    /**
     * Find all rooms that should have been checked out before today's date
     * @param None GET request
     * @return JSONResponse with rooms that should have been checked out
     */
    public function lateCheckout(){
        $lateRooms = DB::table('reservation')
        ->select('id','room_id','user_id','user_type','date_from','date_to')
        ->where('date_to', '<', date('Y-m-d'))
        ->where('activity','active')
        ->get();

        return response()->json([
            'Rooms' => $lateRooms
        ]);
    }

    /**
     * Allows for the employee working at the reception desk to extend 
     * a guest's stay
     * @param Request floor number & room number, I can infer the room ID 
     * date_to to extend stay until. An additional request input is required
     * to determine if the user already paid for the extra charge or not.
     * 
     * All inputs:
     * Floor number - Room number - Date to - Paid flag
     * 
     * @return JSONResponse 1 for true on success and 0 for false on failure
     */
    public function extendStay(Request $request){
        $roomnumber = $request->roomnum;
        $roomfloor = $request->roomfloor;
        $activity = 'busy';
        $paid = $request->paid; //True or False dropdown menu

        $date_to = Carbon::parse($request->dateto);

        $id = DB::table('room')
        ->where('room_number', $roomnumber)
        ->where('floor',$roomfloor)
        ->where('status',$activity)
        ->first();

        if(empty($id)){
            return response()->json([
                "Error" => "No room found"
            ]);
        }

        $roomid = $id->id;
        $roomtype = $id->type;
        $roomview = $id->view;

        $user_id = DB::table('reservation')
        ->where('activity','active')
        ->where('room_id',$roomid)
        ->first();

        $userid = $user_id->user_id;

        $updated = DB::table('reservation')
        ->where('room_id',$roomid)
        ->where('activity','active')
        // ->get();
        ->update(['date_to' => $date_to]);

        $room_price = DB::table('room_prices')
        ->where('view',$roomview)
        ->where('type',$roomtype)
        ->first();

        $roomprice = $room_price->price;

        $olddate = Carbon::parse($user_id->date_to);
        $numberdays = $date_to->diffInDays($olddate);

        if ($date_to->lessThanOrEqualTo($olddate)) {
            return response()->json([
                "Success" => false,
                "Message" => "New date must be greater than old date."
            ]);
        }

        $charge = $roomprice*$numberdays;
        if($updated == 1){
            DB::table('additional_charges')->insert([
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'room_id' => $roomid,
                'user_id' => $userid,
                'charge' => $charge,
                'reason' => "$numberdays extra nights in $roomtype",
                'paid' => $paid
            ]);
        }

        return response()->json([
            'Success' => $updated
        ]);
    }

    /**
     * Add an extra charge onto the room of a specific guest
     * @param Request room number, floor, item, charge, paid flag
     * @return JSONResponse with information of its success
     */
    public function extraCharge(Request $request){
        $roomnumber = $request->roomnum;
        $roomfloor = $request->floor;
        $price = $request->price;
        $paid = $request->paid;
        $item = $request->item;

        $id = DB::table('room')
        ->where('room_number', $roomnumber)
        ->where('floor',$roomfloor)
        ->where('status', 'busy')
        ->first();

        if(empty($id)){
            return response()->json([
                "Error" => "No room found"
            ]);
        }

        $roomid = $id->id;

        $user_id = DB::table('reservation')
        ->where('activity','active')
        ->where('room_id',$roomid)
        ->first();

        $userid = $user_id->user_id;

        $result = DB::table('additional_charges')->insert([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'room_id' => $roomid,
            'user_id' => $userid,
            'charge' => $price,
            'reason' => "Purchased $item",
            'paid' => $paid
        ]);

        return response()->json([
            "Success" => $result
        ]);
    }


    /**
     * Allow the reception desk to view all unpaid charges
     * based off room information
     * @param Request roomnum & floor
     * @return JSONResponse with room all outstanding charges
     * due on the room & user
     */
    public function showCharges(Request $request){
        $roomnumber = $request->roomnum;
        $floor = $request->floor;

        $id = DB::table('room')
        ->where('room_number', $roomnumber)
        ->where('floor',$floor)
        ->where('status', 'busy')
        ->first();

        $roomid = $id->id;

        $user_id = DB::table('reservation')
        ->where('activity','active')
        ->where('room_id',$roomid)
        ->first();

        $userid = $user_id->user_id;

        $charges = DB::table('additional_charges')
        ->where('paid',0)
        ->where('room_id',$roomid)
        ->where('user_id',$userid)
        ->get();

        return response()->json([
            "Unpaid charges" => $charges
        ]);
    }

    /**
     * API to pay for each individual extra charge
     * @param Request additional_charge information
     * @return JSONResponse with success status
     */
    public function payExtraCharges(Request $request){
        $chargesid = $request->id;

        $paid = 1;

        $result = DB::table('additional_charges')
        ->where('id',$chargesid)
        ->update(['paid' => $paid]);

        return response()->json([
            "Success" => $result
        ]);
    }
    
    
    
}
