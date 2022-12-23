<?php

namespace App\Events;

use App\Http\Resources\GameStateResource;
use App\Models\Game;
use App\Models\GameState;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EnemyPlayed implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The user that created the server.
     *
     * @var Game
     */
    public Game $Game;
    public GameState $State;

    /**
     * Create a new event instance.
     *
     * @return void
     */

    public function __construct($game,$state) {
        $this->Game = $game;
        $this->State = $state;
    }
    public function broadcastWith(): GameStateResource {
        return new GameStateResource($this->State);
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn(): Channel|PrivateChannel|array {
        return new PrivateChannel('game.'.$this->Game->uuid());
    }
}
