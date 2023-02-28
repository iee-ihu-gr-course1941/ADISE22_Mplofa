<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)   {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'points' => $this->points,
            'joined' => $this->when($request->user()->isAdmin(),date_format($this->created_at,"d/m/Y H:i:s")),
            'ca' => $this->when($request->user()->isAdmin(),$request->user()->isAdmin()),
        ];
    }
}
