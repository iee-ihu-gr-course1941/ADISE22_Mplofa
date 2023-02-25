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
        $Users = UserResource::collection(User::paginate(4,['*'],'UsersPage')->appends(request()->except('UsersPage')));
        $Reviews = ReviewResource::collection((
            isset($input['rating'])
                ?
                ($input['rating'] === 'All')
                    ?
                Review::paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))
                    :
                Review::where('rating',$input['rating'])->paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))
        : Review::paginate(2,['*'],'ReviewsPage')->appends(request()->except('ReviewsPage'))));
        return Inertia::render('AdminPanel',['Users'=>$Users,'Reviews' => fn ()=>$Reviews]);
    }
}
