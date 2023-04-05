<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInPersonUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('in_person_users', function (Blueprint $table) {
            //Table defaults
            $table->id();
            $table->timestamps();
            //Guest information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender')->nullable();
            $table->date('dob')->nullable();
            $table->string('nationality')->nullable();
            //Is this needed?
            $table->string('phone_num')->unique()->nullable();
            $table->string('details')->nullable();
            //Is the remember token needed?
            $table->remembertoken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('in_person_users');
    }
}
