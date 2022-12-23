<?php

namespace Database\Seeders;

use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CardSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $numbers = ['Ace','Two','Three','Four','Five'
            ,'Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
        $symbols = ['Spades','Hearts','Diamonds','Clubs'];
        $unicodes = ['U+1F0A1','U+1F0A2','U+1F0A3','U+1F0A4','U+1F0A5'
        ,'U+1F0A6','U+1F0A7','U+1F0A8','U+1F0A9','U+1F0AA','U+1F0AB','U+1F0AD','U+1F0AE'
        ,'U+1F0B1','U+1F0B2','U+1F0B3','U+1F0B4','U+1F0B5'
        ,'U+1F0B6','U+1F0B7','U+1F0B8','U+1F0B9','U+1F0BA','U+1F0BB','U+1F0BD','U+1F0BE'
        ,'U+1F0C1','U+1F0C2','U+1F0C3','U+1F0C4','U+1F0C5'
        ,'U+1F0C6','U+1F0C7','U+1F0C8','U+1F0C9','U+1F0CA','U+1F0CB','U+1F0CD','U+1F0CE'
        ,'U+1F0D1','U+1F0D2','U+1F0D3','U+1F0D4','U+1F0D5'
        ,'U+1F0D6','U+1F0D7','U+1F0D8','U+1F0D9','U+1F0DA','U+1F0DB','U+1F0DD','U+1F0DE'];

        $index = 0;
        foreach ($symbols as $symbol) {
            $color = ($symbol === 'Hearts' || $symbol === 'Diamonds') ? 'Red' : 'Black';
            foreach ($numbers as $number) {
                Card::factory(1)->create([
                    'number' => $number,
                    'symbol' => $symbol,
                    'unicode' =>$unicodes[$index],
                    'color' => $color,
                ]);
                $index++;
            }
        }
    }
}
