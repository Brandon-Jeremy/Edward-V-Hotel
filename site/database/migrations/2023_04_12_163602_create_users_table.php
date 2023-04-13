<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            //User important
            $table->string('first_name');
            $table->string('last_name');
            $table->date('dob');

            //exclusive to in person guests
            $table->string('nationality')->nullable();
            // $table->string('gender')->nullable();
            
            //exclusive to online guests
            $table->string('email')->nullable()->unique();
            $table->string('phone_num')->nullable()->unique();
            $table->string('password')->nullable();

            $table->integer('points')->nullable();
            $table->rememberToken();
            $table->timestamp('email_created_at')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('details')->nullable();

            //User token
            $table->string('token')->unique();
            $table->timestamp('token_expiration')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
