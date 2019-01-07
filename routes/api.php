<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=> 'auth', 'namespace'=>'API', 'middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');
    Route::get('getuser', 'AuthController@getUser');
//        ->where('id', '[0-9]+');
    //test
    Route::get('/', 'AuthController@index');
});
