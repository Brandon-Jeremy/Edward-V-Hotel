<!DOCTYPE html>
<html>
<head>
    <title>Reservations Report</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th, td {
            text-align: left;
            padding: 8px;
        }
        
        tr:nth-child(even){background-color: #f2f2f2}
        
        th {
            background-color: #954caf;
            /* #4CAF50 for green */
            /* #954caf for purple */
            color: white;
        }
    </style>
</head>
<body>
    <h1>Reservations Report</h1>
    <table>
    <thead>
        <tr>
            <th>Date From</th>
            <th>Date To</th>
            <th>Room Type</th>
            <th>Room View</th>
            <th>Room Number</th>
            <th>Floor</th>
            <th>Price per Night</th>
            <th>Number of Nights</th>
            <th>Total Price</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($reservations as $reservation)
            <tr>
                <td>{{ $reservation->date_from }}</td>
                <td>{{ $reservation->date_to }}</td>
                <td>{{ $reservation->type }}</td>
                <td>{{ $reservation->view }}</td>
                <td>{{ $reservation->room_number }}</td>
                <td>{{ $reservation->floor }}</td>
                <td>{{ $reservation->price }}</td>
                <td>{{ $reservation->num_nights }}</td>
                <td>{{ $reservation->total_price }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

</body>
</html>
