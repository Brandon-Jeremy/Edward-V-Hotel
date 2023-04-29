<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Contracts\Auth\MustVerifyEmail; //
use Illuminate\Foundation\Auth\User as Authenticatable; //
use Illuminate\Notifications\Notifiable; //

class User extends Authenticatable //extends Model
{
    use HasFactory, Notifiable; //use HasFactory
}
