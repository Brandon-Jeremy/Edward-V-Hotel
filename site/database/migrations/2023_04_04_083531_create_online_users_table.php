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
            $table->timestamps();
            //User important
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob');
            $table->string('email')->unique();
            $table->string('phone_num')->unique();
            $table->string('password');

            $table->integer('points');

            $table->rememberToken();
            $table->timestamp('email_created_at')->nullable();
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
