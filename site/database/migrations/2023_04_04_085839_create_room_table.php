<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoomTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room', function (Blueprint $table) {
            //Table Defaults
            $table->id();
            $table->timestamps();
            //Room information
            $table->boolean('view');
            $table->string('room_number');
            $table->string('floor');
            $table->enum('type',['single','double','suite']);
            $table->enum('status',['available','booked','maintenance','dirty']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room');
    }
}
