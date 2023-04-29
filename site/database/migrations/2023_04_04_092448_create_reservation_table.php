<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation', function (Blueprint $table) {
            //table defaults
            $table->id();
            $table->timestamps();
            //online reservation important information
            $table->date('date_from');
            $table->date('date_to');
            $table->integer('room_id');
            $table->integer('user_id');
            $table->string('user_type');
            $table->string('activity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation');
    }
}
