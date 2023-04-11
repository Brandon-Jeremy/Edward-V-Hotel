<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WalkInUser extends Model
{
    //This model is for all users that rent a room at the hotel in person
    //NOT through the website.
    //Through the reception desk
    protected $table = 'in_person_users';
    
    use HasFactory;
}
