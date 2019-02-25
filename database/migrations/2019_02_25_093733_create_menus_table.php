<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Model\Kind;
use App\Model\Per;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kind', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->string('name_seo', 255);
            $table->text('description')->nullable();
            $table->string('image', 255)->nullable();
            $table->enum('status', [0, 1])->default('1');
            $table->timestamps();
        });

        Kind::insert([
            ['name' => 'Đồ ăn kiêng', 'name_seo' => 'do_an_kieng'],
            ['name' => 'Đồ tự nấu', 'name_seo' => 'do_tu_nau'],
            ['name' => 'Món ăn nhanh', 'name_seo' => 'mon_an_nhanh'],
            ['name' => 'Ngũ cốc đêm', 'name_seo' => 'ngu_coc_dem'],
            ['name' => 'Đồ uống', 'name_seo' => 'do_uong'],
            ['name' => 'Đồ nhậu', 'name_seo' => 'do_nhau']
        ]);

        Schema::create('per', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->timestamps();
        });

        Per::insert([
            ['name' => 'Kg'],
            ['name' => 'Cái'],
            ['name' => 'Cặp'],
            ['name' => 'Lít']
        ]);


        Schema::create('menus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 255);
            $table->string('name_seo', 255);
            $table->string('image', 255);
            $table->text('description');
            $table->float('price');
            $table->integer('per_id')->default('1')->unsigned();
            $table->foreign('per_id')->references('id')->on('per');
            $table->float('discount')->default('0');
            $table->integer('kind_id')->unsigned();
            $table->foreign('kind_id')->references('id')->on('kind')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
        Schema::dropIfExists('kind');
        Schema::dropIfExists('per');
    }
}
