<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    //Used to let the model know what table to use since i didn't name 
    //the table right (should be rewards not reward)
    protected $table = 'reward';

    use HasFactory;
}
