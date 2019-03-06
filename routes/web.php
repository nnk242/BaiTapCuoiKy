<?php

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

Route::get('/login/facebook/redirect', 'AuthController@redirectFacebook')->name('login.facebook.redirect');
Route::get('admin/login/facebook/callback', 'AuthController@callbackFacebook')->name('login.facebook.callback');

Route::get('/{any}', 'AnyController@index')->where('any', '.*');
