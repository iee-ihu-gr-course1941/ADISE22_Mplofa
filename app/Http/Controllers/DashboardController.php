<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller {

    public function Dashboard(): \Inertia\Response {
        return Inertia::render('Dashboard',['User'=>Auth::user()]);
    }
}
