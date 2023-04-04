<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOnlineUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('online_users', function (Blueprint $table) {
            //Table important
            $table->id();
            //User important
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob');
            $table->string('email')->unique();
            $table->string('phone_num')->unique();
            $table->string('password');

            $table->integer('points');

            //$table->string('billing_address');
            $table->string('card_number');
            $table->string('card_name');
            $table->string('card_cvv');
            $table->string('card_exp');
            $table->string('card_type');
            $table->string('card_country');
            
            $table->string('passport_id')->unique();
            $table->rememberToken();
            $table->timestamp('email_created_at');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('details')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('online_users');
    }
}
