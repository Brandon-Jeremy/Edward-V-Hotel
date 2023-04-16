<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;

class ExportController extends Controller
{
    public function generatePDF(Request $request){
        $startDate = $request->start;
        $endDate = $request->end;
    
        // Get the reservations between the dates
        $reservations = DB::table('reservation')
            ->whereBetween('date_from', [$startDate, $endDate])
            ->whereBetween('date_to', [$startDate, $endDate])
            ->join('room', 'reservation.room_id', '=', 'room.id')
            ->select('reservation.*', 'room.room_number', 'room.floor')
            ->get();
    
        // Generate the PDF file
        $pdf = PDF::loadView('reservations', compact('reservations'));
    
        // Set the file name and headers
        $fileName = 'reservations-' . date('Y-m-d_H:i:s') . '.pdf';
        return $pdf->download($fileName);
    }
    
}
