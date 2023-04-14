<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FinancesController extends Controller
{
        /**
         * Return the revenue earned between 2 dates
         * @param Request 2 Dates: date_from & date_to
         * @return JSONResponse Information containing the following:
         *                      Single room count
         *                      Double room count (with and without views)
         *                      Suite room count
         *                      Revenue earned between 2 dates
         */
        public function computeFinances(Request $request){
            $date_from = $request->datefrom;
            $date_to = $request->dateto;

            $singleCountWithoutView = 0;
            $doubleCountWithoutView = 0;
            $doubleCountWithView = 0;
            $suiteCountWithView = 0;

            $singlePriceWithoutView = DB::table('room_prices')
                ->select('price')
                ->where('type','single')
                ->where('view',0)
                ->first();

            $doublePriceWithView = DB::table('room_prices')
                ->select('price')
                ->where('type','double')
                ->where('view',1)
                ->first();

            $doublePriceWitouthView = DB::table('room_prices')
                ->select('price')
                ->where('type','double')
                ->where('view',0)
                ->first();

            $suitePriceWithView = DB::table('room_prices')
                ->select('price')
                ->where('type','suite')
                ->where('view',1)
                ->first();

            $roomids = DB::table('reservation')
            ->where('date_from',$date_from)
            ->where('date_to',$date_to)
            ->get();

            $roomID = $roomids->pluck('room_id')->toArray();


            foreach($roomID as $id){
                $roomtype = DB::table('room')
                ->select('type','view')
                ->where('id',$id)
                ->first();

                if($roomtype->type === "single") {
                    $singleCountWithoutView++;
                }
                elseif($roomtype->type === "double" && $roomtype->view === 0){
                    $doubleCountWithoutView++;
                }
                elseif($roomtype->type === "double" && $roomtype->view === 1){
                    $doubleCountWithView++;
                }
                elseif($roomtype->type === "suite"){
                    $suiteCountWithView++;
                }
            }

            // var_dump($singlePriceWithoutView);

            $revenue = ($singleCountWithoutView*$singlePriceWithoutView->price)
                        +($doubleCountWithoutView*$doublePriceWitouthView->price)
                        +($doubleCountWithView*$doublePriceWithView->price)
                        +($suiteCountWithView*$suitePriceWithView->price);

            return response()->json([
                'General Information' => [
                    'Single Count' => $singleCountWithoutView,
                    'Double Count w/o View' => $doubleCountWithoutView,
                    'Double Count w/ View' => $doubleCountWithView,
                    'Suite count' => $suiteCountWithView,
                ],
                'Revenue' => $revenue,
                'Date From' => $date_from,
                'Date To' => $date_to,
            ]);
            
        }

        /**
         * Number of reservations made at the hotel between 2 dates
         * @param Request 2 dates: date_from & date_to
         * @return JSONReponse containing information abt #occupants
         */
        public function occupancyData(Request $request){
            $date_from = $request->datefrom;
            $date_to = $request->dateto;

            $occupancy = 0;

            // Syntax
            // ->where('date_to', '<', date('Y-m-d'))

            $roomids = DB::table('reservation')
            ->where('date_from','>=',$date_from)
            ->where('date_to','<=',$date_to)
            ->get();

            $roomID = $roomids->pluck('room_id')->toArray();

            foreach($roomID as $rooms){
                $occupancy++;
            }

            return response()->json([
                "Number of rooms rented" => $occupancy
            ]);
        }
}
