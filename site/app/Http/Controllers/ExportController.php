<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;
use Carbon\Carbon;


class ExportController extends Controller
{
    // public function generatePDF(Request $request){
    //     $startDate = $request->start;
    //     $endDate = $request->end;
    
    //     // Get the reservations between the dates
    //     $reservations = DB::table('reservation')
    //         ->whereBetween('date_from', [$startDate, $endDate])
    //         ->whereBetween('date_to', [$startDate, $endDate])
    //         ->join('room', 'reservation.room_id', '=', 'room.id')
    //         ->select('reservation.*', 'room.room_number', 'room.floor')
    //         ->get();
    
    //     // Generate the PDF file
    //     $pdf = PDF::loadView('reservations', compact('reservations'));
    
    //     // Set the file name and headers
    //     $fileName = 'reservations-' . date('Y-m-d_H:i:s') . '.pdf';
    //     return $pdf->download($fileName);
    // }

    public function generatePDF(Request $request){
        $startDate = $request->start;
        $endDate = $request->end;
    
        // Get the reservations between the dates
        $reservations = DB::table('reservation')
        ->whereBetween('date_from', [$startDate, $endDate])
        ->whereBetween('date_to', [$startDate, $endDate])
        ->join('room', 'reservation.room_id', '=', 'room.id')
        ->join('room_prices', function($join){
            $join->on('room_prices.type', '=', 'room.type')
                 ->on('room_prices.view', '=', 'room.view');
        })
        ->select('reservation.*', 'room.room_number', 'room.floor', 'room.type', 'room.view', 'room_prices.price')
        ->get();
    
    
        // Calculate total price for each reservation based on number of nights stayed
        foreach ($reservations as $reservation) {
            $startDate = Carbon::createFromFormat('Y-m-d', $reservation->date_from);
            $endDate = Carbon::createFromFormat('Y-m-d', $reservation->date_to);
            $numNights = $endDate->diffInDays($startDate);
            $reservation->num_nights = $numNights;
            $reservation->total_price = $numNights * $reservation->price;
        }
    
        // Generate the PDF file
        $pdf = PDF::loadView('reservations', compact('reservations'));
    
        // Set the file name and headers
        $fileName = 'reservations-' . date('Y-m-d_H:i:s') . '.pdf';
        return $pdf->download($fileName);
    }
    
    
    
    
}
