<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGiftcodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('giftcode', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //giftcodes additions
            $table->boolean('isRedeemed');
            $table->string('token');
            $table->integer('value');
            $table->timestamp('creation_date');
            $table->timestamp('expiration_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('giftcode');
    }
}
