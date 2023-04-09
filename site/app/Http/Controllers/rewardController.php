<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reward;

class rewardController extends Controller
{
    public function getRewards(){
        $rewards = Reward::select('id', 'item', 'price','img_path')->get();
        return response()->json($rewards);
    }

}
