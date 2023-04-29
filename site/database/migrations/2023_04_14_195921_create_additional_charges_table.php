<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdditionalChargesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('additional_charges', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->integer('room_id');
            $table->integer('user_id');
            $table->integer('charge');
            $table->string('reason');
            $table->boolean('paid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('additional_charges');
    }
}
