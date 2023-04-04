<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseGiftcodeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_giftcode', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            //Purchase giftcode table additions
            $table->integer('onlineuser_id');
            $table->integer('giftcard_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchase_giftcode');
    }
}
