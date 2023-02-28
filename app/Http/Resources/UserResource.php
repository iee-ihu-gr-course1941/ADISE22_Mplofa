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
        {
            return [
                'id' => !is_null($this) && $this->id,
                'name' => !is_null($this) &&  $this->name,
                'email' => !is_null($this) &&  $this->email,
                'points' => !is_null($this) &&  $this->points,
                'joined' => !is_null($this) &&  $this->when($request->user()->isAdmin(),date_format($this->created_at,"d/m/Y H:i:s")),
                'ca' => !is_null($this) &&  $this->when($request->user()->isAdmin(),$request->user()->isAdmin()),
            ];
        }
    }
}
