<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MoveController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::get('/', [WelcomeController::class,'welcome']);
Route::get('/dashboard',[DashboardController::class,'Dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Auth::routes();



Auth::routes();
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', [GameController::class, 'store'])->name('welcome');
});
Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::group(['prefix'=>'Move','middleware' => 'auth'], function () {
    Route::post('/Make',[MoveController::class,'store'])->name('Make_Move');
});
Route::get('Game/checkEnemyMove',[GameController::class, 'checkEnemyMove'])->name('Check_Enemy_Move');
require __DIR__.'/auth.php';
