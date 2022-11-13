<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Move extends Model {
    use HasFactory,HasUuids;

    protected $fillable = [
        'user_id',
        'game_id',
        'status',
        'cards_played',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function status() {
        return $this->status;
    }

    public function user() {
        return $this->user_id;
    }

    public function game() {
        return $this->game_id;
    }

    public function cards() {
        return is_null($this->cards_played) ?: ['cards_played'=>[],'as'=>['count'=>0,'symbols'=>[]]];
    }
//    Status = [1:'Played',2:'Called Bluff',3:'Pass'].
}
