<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller {

    public function Dashboard(): Response {
        return Inertia::render('Dashboard');
    }
}
