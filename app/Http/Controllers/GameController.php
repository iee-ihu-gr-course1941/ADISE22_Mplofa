<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameStateResource;
use App\Models\Card;
use App\Models\Game;
use App\Models\GameState;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GameController extends Controller {
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
     * @return \Illuminate\Http\JsonResponse|\Inertia\Response
     */
    public function store(Request $request) {
//        $input = $request->only('graded','player1','player2');
        $Game = new Game;
//        $Game->graded = $input['graded']; Production
        $Game->graded = 1;
//        $Game->players = json_encode(['player1' => $input['player1'],'player2' => $input['player2']]); Production
        $Game->players = json_encode(['player1' => $request->user()->id,'player2' => '97b43de5-1979-49d5-98ef-ec94116d5394']);
        $Game->save();
        $Player1 = $request->user();
        $Player2 = User::find('97b43de5-1979-49d5-98ef-ec94116d5394');
//        return response()->json(['Initial State'=>$this->initialize($Game),'Game'=>$Game]);
        return Inertia::render('Game/GameCanvas',['Game'=>$this->initialize($Game),
            'Players'=>['Player1'=>$Player1,'Player2'=>$Player2]]);
//        return response()->json(['success'=>true,
//            'Game' => $Game]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function show(Game $game) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Game $game) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Game  $game
     * @return \Illuminate\Http\Response
     */
    public function destroy(Game $game) {
        //
    }

    public function initialize(Game $game) {
        $players = $game->players();
        $player1 = $players->player1;
        $player2 = $players->player2;

        $cards = Card::split_cards();
        $cards_1 = $cards[0];
        $cards_2 = $cards[1];

        $Initial_State = new GameState;
        $Initial_State->game_id = $game->uuid();
        $Initial_State->sequence_number = 0;
        $Initial_State->is_bluffed = false;
        $Initial_State->cards_down = json_encode(['cards_down'=>[]]);
        $Initial_State->cards_played = json_encode(['cards_played'=>[],'as'=>[]]);
        $Initial_State->bluff_has_been_called = false;
        $Initial_State->player_cards = json_encode(['player1'=>['id'=>$player1,'cards'=>$cards_1], 'player2'=>['id'=>$player2,'count'=>count($cards_2)]]);
        $Initial_State->next_player = mt_rand(0,1) ? $player1 : $player2;
        $Initial_State->status = 'Active';

        $Initial_State->save();

        return new GameStateResource($Initial_State);
    }

}
