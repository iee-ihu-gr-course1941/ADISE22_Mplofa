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
        Schema::create('game_states', function (Blueprint $table) {
            $table->uuid('id');
            $table->timestamps();
//          A number indicating the number of the current state in the game;
            $table->foreignUuid('game_id');
//          A boolean indicating if a bluff is in place by the previous player.
            $table->integer('sequence_number');
//          The reference to the Games Table.
            $table->boolean('is_bluffed');
//          A boolean indicating if bluff has been called by the current playing player,
//          forcing the cards down to be revealed.
            $table->boolean('bluff_has_been_called');
//          A JSON Object looking like {cards_down:[with references to the Cards Table]}.
//          It is a hidden table column, the values of the cards themselves are not sent to the client, only the count.
            $table->json('cards_down');
//          A JSON Object looking like {cards_played:[with references to the Cards Table], as:'[count:cards_count, symbols:cards_('supposed')values]'}.
//          It is a hidden table column, the ('Real') values of the cards themselves are not sent to the client, only the 'as' part.
            $table->json('cards_played')->nullable();
//          A JSON Object looking like {player1_cards:{card1,card2,etc..},player2_cards:{card1,card2,etc...}}.
//          It is a hidden table column, the values of the cards themselves are not sent to the client.
            $table->json('player_cards');
//          The id of the next player.
            $table->foreignUuid('next_player');
//          The status of the game state ['Game Over','Abandoned','Active'], 'Active' means the game is ongoing,
//          'Game Over' means there is a winner,
//          and 'Abandoned' means that someone has left the game.
            $table->string('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('game_states');
    }
};
