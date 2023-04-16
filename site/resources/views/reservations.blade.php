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
            background-color: #4CAF50;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Reservations Report</h1>
    <table>
        <thead>
            <tr>
                <th>Room</th>
                <th>Floor</th>
                <th>Date From</th>
                <th>Date To</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($reservations as $reservation)
            <tr>
                <td>{{ $reservation->room_number }}</td>
                <td>{{ $reservation->floor }}</td>
                <td>{{ $reservation->date_from }}</td>
                <td>{{ $reservation->date_to }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
