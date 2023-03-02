<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoomCollection;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;

class HomeController extends Controller {
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Inertia\Response
     */
    public function index(Request $request) {
        $InviteLink = URL::signedRoute('register', ['refId' => $request->user()->id]);
        return Inertia::render('Dashboard',['Rooms'=> fn ()=> new RoomCollection(Room::where('GameActive',0)->get()),
            'InviteLink'=>$InviteLink]);
    }
}
