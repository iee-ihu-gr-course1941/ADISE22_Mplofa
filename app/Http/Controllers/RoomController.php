<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\Lobby;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RoomController extends Controller {
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
     * @return Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param Room $room
     * @return Response
     */
    public function show(Room $room) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Room $room
     * @return Response
     */
    public function edit(Room $room) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Room $room
     * @return Response
     */

    public function update(Request $request, Room $room) {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param Room $room
     * @return Response
     */
    public function destroy(Room $room) {
        //
    }

    public function setReady(Request $request, Room $room) {
       $User = $request->user()->id;

       if($User === $room->Player1()) {
           $room->Player1Ready = !$room->Player1Ready();
//           if($room->Player1Ready() && $room->Player2Ready()) {
//           }
       }
       elseif($User === $room->Player2()) {
           $room->Player2Ready = !$room->Player2Ready();
//           if($room->Player1Ready() && $room->Player2Ready()) {
//           }
       }
       return false;
    }
}
