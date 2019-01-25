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

Route::group(['prefix' => 'auth', 'namespace' => 'API', 'middleware' => 'api'], function () {
    Route::post('login', 'AuthController@login');
    Route::get('logout', 'AuthController@logout');
    Route::get('getUserInfo', 'AuthController@getUserInfo');
    Route::put('updateUserInfo', 'AuthController@updateUserInfo');

    Route::post('checkPassword', 'AuthController@checkPassword');//check password
    Route::put('changePassword', 'AuthController@changePassword');//update password

    Route::post('uploadAvatar', 'AuthController@uploadAvatar');//change password
//        ->where('id', '[0-9]+');
    //test
    Route::get('/', 'AuthController@index');
});

Route::group(['namespace' => 'API', 'middleware' => 'api'], function () {
//    Route::apiResource('/', 'DistributorController');
//    Route::get('/test', 'DistributorController@test');
    Route::apiResources([
        'distributor' => 'DistributorController',
//        'posts' => 'PostController'
    ]);
});
