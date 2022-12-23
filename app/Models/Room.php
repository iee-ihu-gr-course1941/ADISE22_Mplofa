<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model {
    use HasFactory;

    protected $fillable = [
        'Player1',
        'Player2',
        'Player1Ready',
        'Player2Ready',
        'Game_Active'
    ];

    public function Player1() {
        return $this->Player1;
    }
    public function Player2() {
        return $this->Player2;
    }
    public function Player1Ready() {
        return $this->Player1Ready;
    }
    public function Player2Ready() {
        return $this->Player2Ready;
    }
    public function Active() {
        return $this->Game_Active;
    }
}
