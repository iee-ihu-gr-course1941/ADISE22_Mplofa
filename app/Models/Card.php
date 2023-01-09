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

    public static function cardsToBeDiscarded(): array {
        $codes = [];
        do {
            $code = random_int(1, 52);
            if(!in_array($code,$codes))
                $codes[]=$code;
        } while (sizeof($codes)<12);

        return $codes;
    }

    public static function split_cards(): \Illuminate\Database\Eloquent\Collection|\Illuminate\Support\Collection {
        $codes = self::cardsToBeDiscarded();
        $cards = Card::all()->except(['created_at','updated_at']);
        $shuffled = $cards->reject(function ($value) use ($codes) {
            return in_array($value->id,$codes);
        });

        return $shuffled->shuffle()->splitIn(2);
    }
}
