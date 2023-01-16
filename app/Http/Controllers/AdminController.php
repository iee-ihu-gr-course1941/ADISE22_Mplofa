<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Http\Resources\UserResource;
use App\Models\Review;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller {

    public function show() {
        $Users = UserResource::collection(User::all());
        $Reviews = ReviewResource::collection(Review::all());
        return Inertia::render('AdminPanel',['Users'=>$Users,'Reviews'=>$Reviews]);
    }
}
