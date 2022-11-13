<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('moves', function (Blueprint $table) {
            $table->uuid('id');
//          A reference to the Users Table, indicating the user who made the move.
            $table->foreignUuid('user_id');
//          A number indicating the number of the current state in the game;
            $table->foreignUuid('game_id');
//          A number referring to the status of the move [1:'Played',2:'Called Bluff',3:'Passed'].
            $table->tinyInteger('status');
//          A JSON Object looking like {cards_played:[with references to the Cards Table], as:'cards_count cards_('supposed')values'}.
//          It is not a hidden table column on this table since data from this table is never sent to the client
//          ,the ('Real') values of the cards and the 'as' part are used to evaluate if a bluff is in place.
//          It is null if the player has called a bluff on the previous player, or if the player did Pass.
            $table->json('cards_played')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('moves');
    }
};
