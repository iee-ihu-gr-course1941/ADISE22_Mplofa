<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Card extends Model {
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    public static function split_cards() {
        $cards = Card::all()->except(['created_at','updated_at']);
        $shuffled = $cards->shuffle();

        return $shuffled->splitIn(2);
    }
}
