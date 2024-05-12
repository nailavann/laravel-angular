<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Form\FormController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('form', [FormController::class, 'store']);
    Route::get('form', [FormController::class, 'index'])->middleware('admin');
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('user', [UserController::class, 'getUser']);

});

