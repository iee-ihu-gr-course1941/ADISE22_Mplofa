<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameStateResource;
use App\Http\Resources\RoomResource;
use App\Models\Card;
use App\Models\Game;
use App\Models\GameState;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//        $Game->graded = $input['graded']; Production
//        $Game->graded = 1;
//        $Game->players = json_encode(['player1' => $input['player1'],'player2' => $input['player2']]); Production

class GameController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(Request $request) {
        $Room = $request->session()->get('Room');
        $Game = new Game;
        $Game->save();
        $Room->GameId = $Game->id;
        $Room->save();

        return Inertia::render('Game/GameWaitingRoom',['Room' => new RoomResource($Room)]);
    }

    protected function otherPlayer($players,$last) {
        return $last === $players['player1'] ? $players['player2'] : $players['player1'];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse|\Inertia\Response
     */
    public function store(Request $request) {
        $Room = Room::find($request->only(['Room']));
//            ->session()->get('Room');
        if(!is_null($Room)){
            $User = $request->user();
            $Active_Game = Game::find($Room[0]->GameId);
            $First_State = GameState::where('game_id',$Active_Game->id)->where('sequence_number',0)->get();

            if($First_State->isEmpty()) {
                $Active_Game->players = json_encode(['player1' => $Room[0]->Owner()->id,'player2' => $Room[0]->Player()->id]);
                $Active_Game->save();
                $GameState = $this->initiate($Active_Game);
            }
            else
                $GameState = new GameStateResource($First_State[0]);

            $Player1 = $Room[0]->Owner();
            $Player2 = $Room[0]->Player();

            return Inertia::render('Game/GameCanvas',
                [
                    'Room' => new RoomResource($Room[0]),
                    'Game'=> $GameState,
                    'Players'=>['Player1'=>$Player1,'Player2'=>$Player2]
                ]);
        }
    }

    public function startGameForPlayer(Request $request) {
        $input = $request->only('RoomId');
        $Room = Room::find($input['RoomId']);
        $Active_Game = Game::find($Room->GameId);
        $Player1 = $request->user();
        $Player2 = $Room->Owner();

        return Inertia::render('Game/GameCanvas',['Room'=>new RoomResource($Room),'Game'=>$Active_Game,
            'Players'=>['Player1'=>$Player1,'Player2'=>$Player2]]);
    }
    /**
     * Display the specified resource.
     *
     * @param Game $game
     * @return \Inertia\Response
     */

    public function showWinner(Request $request) {
        $input = $request->only('GameId');
        $Game = Game::find($input['GameId']);
        $Player1 = User::find($Game->players()->player1);
        $Player2 = User::find($Game->players()->player2);
        if($Game->winner) {
            $Winner = User::find($Game->winner);
            return Inertia::render('Game/WinningScreen',
                ['Game'=>$Game,'Winner'=>$Winner,'Player1'=>$Player1,'Player2'=>$Player2]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Game $game
     * @return Response
     */
    public function edit(Game $game) {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Game $game
     * @return Response
     */
    public function update(Request $request, Game $game) {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Game $game
     * @return Response
     */
    public function destroy(Game $game) {
        //
    }

    public function initiate(Game $game) {
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
        $Initial_State->player_cards = json_encode(['player1'=>['id'=>$player1,'cards'=>$cards_1], 'player2'=>['id'=>$player2,'cards'=>$cards_2]]);
        $Initial_State->next_player = mt_rand(0,1) ? $player1 : $player2;
        $Initial_State->status = '1';

        $Initial_State->save();

        return new GameStateResource($Initial_State);
    }

    public function checkEnemyMove(Request $request) {
        $input = $request->only('GameId');
        $Game = Game::find($input['GameId']);
        if($Game->winner){
            return Redirect::route('Winner',['GameId'=>$Game->id]);
        }
        $State = GameState::where('game_id',$input['GameId'])->orderByDesc('sequence_number')->first();
        if($State->next_player() === $request->user()->id) {
            return Inertia::render('Game/GameCanvas',['Game'=>new GameStateResource($State),
                'Players'=>['Player1'=>$request->user()->id,'Player2'=>$State->next_player],'GameObject'=>$Game]);
        }
//            return $State[0]->next_player()===$request->user()->id;
    }
}


//useEffect(() => {
//    const timer = !myTurn && setTimeout(() => {
//        console.log("Checking for new Enemy Move");
//        Inertia.post(route('Check_Enemy_Move'),{GameId:props.Game.game_id,Example:'Example'},{
//            preserveScroll:true,
//                    onSuccess:
//                        (res)=> {
//                res.props.Game && setNewState(res.props.Game);
//                res.props.Game && setMyTurn(true);
//                // console.log("Response",res);
//            }
//                });
//        }, 1000);
//
//        return () => clearTimeout(timer); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
//    }, [Game]);
