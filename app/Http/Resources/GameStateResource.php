<?php

namespace App\Http\Resources;

use App\Models\Game;
use Illuminate\Http\Resources\Json\JsonResource;

class GameStateResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        $User = $request->user()->id;
        $cards_down = json_decode($this->cards_down);
        $cards_down_count = count($cards_down->cards_down);
        $Game = Game::find($this->game_id);
        $Players = $Game->players();
        $Player_Cards = $this->getPlayerCards(json_decode($this->player_cards),$User);

        return [
            'game_id' => $this->game_id,
            'sequence_number' => $this->sequence_number,
            'next_player' => $this->next_player,
            'cards_down' => $cards_down_count,
            'status' => $this->status,
            'player_cards' => $Player_Cards
        ];
    }

    protected function getPlayerCards($players,$player_id) {
        $current_user_cards = $enemy_user_cards = $enemy_user_id =  null;
        foreach ($players as $player) {
            if($player->id === $player_id) {
                $current_user_cards = $player->cards;
            }
            else {
                $enemy_user_id = $player->id;
                $enemy_user_cards = count((array)$player->cards);
            }
        }
        return ['player1'=>['id'=>$player_id,'cards'=>(array)$current_user_cards], 'player2'=>['id'=>$enemy_user_id,'count'=>$enemy_user_cards]];
    }
}
