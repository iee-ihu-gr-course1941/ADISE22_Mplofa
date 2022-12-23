<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('rooms', function (Blueprint $table) {
            $table->uuid('id');
            $table->foreignUuid('Player1')->nullable();
            $table->foreignUuid('Player2')->nullable();
            $table->boolean('Player1Ready')->default(false);
            $table->boolean('Player2Ready')->default(false);
            $table->boolean('GameActive')->default(false);
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
        Schema::dropIfExists('lobbies');
    }
};
