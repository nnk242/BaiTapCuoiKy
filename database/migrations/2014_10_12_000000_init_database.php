<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InitDatabase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('last_name')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('avatar', 255)->nullable();
            $table->enum('role', ['admin', 'member', 'staff'])->default('member');
            $table->rememberToken();
            $table->string('phone', 20)->nullable();
            $table->string('description', 255)->nullable();
            $table->enum('gender', ['male', 'female'])->nullable();
            $table->timestamps();
            $table->timestamp('deleted_at')->nullable();
        });

        DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('admin123'),
                'role' => 'admin'
            ],
            [
                'name' => 'member',
                'email' => 'member@member.com',
                'password' => bcrypt('member123'),
                'role' => 'member'
            ],
            [
                'name' => 'staff',
                'email' => 'staff@staff.com',
                'password' => bcrypt('staff123'),
                'role' => 'staff'
            ]
        ]);
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
