<?php

namespace App\Http\Controllers;

use App\Models\Bug;
use Illuminate\Http\Request;

class BugController extends Controller {

    public function store(Request $request) {
        $input = $request->only(['device','bug_description']);
        $Bug = new Bug;
        $Bug->user = $request->user()->id;
        $Bug->encountered_at = $input['device'];
        $Bug->description = $input['bug_description'];
        $Bug->save();
    }
}
