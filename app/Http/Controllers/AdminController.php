<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Http\Resources\UserResource;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller {

    public function show(Request $request) {
        $input = $request->only(['rating']);
        $Users = UserResource::collection(User::paginate(1));
        $Reviews = ReviewResource::collection((
            isset($input['rating'])
                ?
                ($input['rating'] === 0 || is_null($input['rating']))
                    ?
                Review::all()
                    :
                Review::where('rating',$input['rating'])->get()
        : Review::all()));
        return Inertia::render('AdminPanel',['Users'=>$Users,'Reviews' => fn ()=>$Reviews]);
    }
}
