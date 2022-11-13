<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller {

    public function Dashboard() {
        return Inertia::render('Dashboard');
    }
}
