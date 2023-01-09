<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameStateResource;
use App\Models\Card;
use App\Models\Game;
use App\Models\GameState;
use App\Models\Move;
use Illuminate\Http\Request;
use Inertia\Inertia;
use JetBrains\PhpStorm\ArrayShape;

class MoveController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function store(Request $request) {
        $input = $request->only('user_id','game_id','status','cards_played');

//      Create and save the new Move into the database.
        $New_Move = new Move;

        $New_Move->user_id = $request->user()->id;
        $New_Move->game_id = $input['game_id'];
        $New_Move->status = $input['status'];
        $New_Move->cards_played = json_encode($input['cards_played']);
        $New_Move->save();

        return $this->handleMove($New_Move);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Move  $move
     * @return \Illuminate\Http\Response
     */
    public function show(Move $move) {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Move  $move
     * @return \Illuminate\Http\Response
     */
    public function edit(Move $move) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Move  $move
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Move $move) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Move  $move
     * @return \Illuminate\Http\Response
     */
    public function destroy(Move $move) {
        //
    }

    protected function checkVictory($cards1, $cards2, $bluff_called) {
        return !$bluff_called && (count($cards1)===0 || count($cards2)===0);
    }
    protected function checkBluff($cards) {
        $as = $cards->as;
        $number = $as->number;

        foreach ($cards->cards_played as $card) {
            if($card->number !== $number)
                return true;
        }
        return false;
    }

    #[ArrayShape(['player1' => "mixed", 'player2' => "mixed"])] protected function getGamePlayers($game_id) {
        $Game = Game::find($game_id);
        $players = json_decode($Game->players);
        return ['player1'=>$players->player1,'player2' => $players->player2];
    }

    protected function nextTurn($players,$last) {
        return $last === $players['player1'] ? $players['player2'] : $players['player1'];
    }

    protected function newState($game_id,$sequence_number,$bluff_called,$bluffed,
    $cards_played,$next_player,$status,$cards_down,$players_cards) {
        $New_State = new GameState;
        $New_State->sequence_number = $sequence_number+1;
        $New_State->game_id = $game_id;
        $New_State->bluff_has_been_called = $bluff_called;
        $New_State->is_bluffed = $bluffed;
        $New_State->cards_played = json_encode($cards_played);
        $New_State->status = $status;
        $New_State->cards_down = json_encode($cards_down);
        $New_State->next_player = $next_player;
        $New_State->player_cards = is_string($players_cards) ? $players_cards : json_encode($players_cards);
        $New_State->save();
        return $New_State;
    }

    protected function handleMove(Move $move) {
//      Game Variables
        $GamePlayers = $this->getGamePlayers($move->game());

        $Last_State = GameState::where('game_id',$move->game())
            ->orderBy('sequence_number', 'desc')->first();
        $player_cards = json_decode($Last_State->player_cards);
        $player1_cards = $player_cards->player1->cards;
        $player2_cards = $player_cards->player2->cards;
        $cards_played = json_decode($move->cards());
        $previous_cards_played = json_decode($Last_State->cards_played());
        $cards_down = json_decode($Last_State->cards_down);
        switch ($move->status()) {
//      Played
            case '1': {
//      Check if a player meets the conditions to win.
                if($this->checkVictory($player1_cards,$player2_cards,$move->status())) {
                    $State =  new GameStateResource($this->newState($move->game(),$Last_State->sequence(),false,
                        $this->checkBluff($cards_played),$move->cards(),$this->nextTurn($GamePlayers,$move->user()),'2'
                        ,['cards_down'=>[]],
                        $this->assignCards($player_cards,$move->user(),$cards_played->cards_played,'remove')));
                }
                else {
                    $State =  new GameStateResource($this->newState($move->game(),$Last_State->sequence(),false,
                        $this->checkBluff($cards_played),$move->cards(),$this->nextTurn($GamePlayers,$move->user()),'1'
                        ,['cards_down'=>$this->getCardsDown($cards_down->cards_down,$cards_played)],
                        $this->assignCards($player_cards,$move->user(),$cards_played->cards_played,'remove')));
                }
                break;
            }

//      Called Bluff
            case '2': {
//      Check if the current player called a bluff and if the last player did actually bluff.
                if($Last_State->is_bluffed() && $move->status() === "2") {
                    $State = new GameStateResource($this->newState($move->game(),$Last_State->sequence(),true,
                        true,$move->cards(),$this->nextTurn($GamePlayers,$move->user()),'1',['cards_down'=>[]],
                        $this->assignCards($player_cards,$this->nextTurn($GamePlayers,$move->user()),
                            $cards_down->cards_down,'add')));
                }
                else {
                    $State = new GameStateResource($this->newState($move->game(),$Last_State->sequence(),true,
                        false,$move->cards(),$this->nextTurn($GamePlayers,$move->user()),'1',['cards_down'=>[]],
                        $this->assignCards($player_cards,$move->user(),$cards_down->cards_down,'add')));
                }
                break;
            }
//      Pass
            case '3': {
                if($this->checkVictory($player1_cards,$player2_cards,$move->status())){
                    $State =  new GameStateResource($this->newState($move->game(),$Last_State->sequence(),false,
                        false,$move->cards(),$this->nextTurn($GamePlayers,
                            $move->user()),'2',['cards_down'=>[]],$player_cards));
                }
                else {
                    $State =  new GameStateResource($this->newState($move->game(),$Last_State->sequence(),false,
                        false,$move->cards(),$this->nextTurn($GamePlayers,
                            $move->user()),'1',$cards_down,$player_cards));
                }
                break;
            }
        }
        return Inertia::render('Game/GameCanvas',['Game' => Inertia::lazy(fn()=>$State),
            'Players'=>Inertia::lazy(fn ()=>['Player1'=>$move->user(),'Player2'=>$this->nextTurn($GamePlayers,
            $move->user())])]);
    }

    protected function assignCards($player_cards,$player_id,$cards,$case) {
        $new_player_cards = $player_cards;
        foreach ($player_cards as $player) {
            if ($player->id === $player_id) {
                switch ($case) {
                    case 'add': {
                        $player->cards = array_merge((array)$player->cards,$cards);
                        break;
                    }
                    case 'remove' : {
                        $player->cards = array_udiff((array)$player->cards, (array)$cards, function ($card_A, $card_B) {
                            return strcmp($card_A->id, $card_B->id);
                        });
                        break;
                    }
                }
            }
        }
        return (object)$player_cards;
    }
    protected function getCardsDown($last_state_cards,$cards_played) {
            return array_merge($last_state_cards,$cards_played->cards_played);
        }
}
