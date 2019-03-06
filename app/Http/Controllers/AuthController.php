<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    private function createRedirect($existingUser, $user, $login_type)
    {

        if ($existingUser) {
            // log them in
            auth()->login($existingUser, true);
        } else {
            $check_user = User::onlyTrashed()->where('social_id', $user->id)->count();
            if ($check_user) {
                return 1;
            }
            $check_user = User::where('social_id', $user->id)->count();
            if ($check_user) {
                $this->model()::where(['email' => $user->email, 'login_type' => $login_type])->first()->update([
                    'name' => $user->name,
                    'email' => $user->email,
                    'social_id' => $user->id,
                    'avatar' => $user->avatar,
                    'avatar_original' => $user->avatar_original
                ]);
                $user_login = $this->model()::where(['email' => $user->email, 'login_type' => $login_type])->first();
                auth()->login($user_login, true);
            } else {
                $user_login = $this->model()::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'social_id' => $user->id,
                    'avatar' => $user->avatar,
                    'avatar_original' => $user->avatar_original,
                    'login_type' => $login_type
                ]);
                auth()->login($user_login, true);
            }
        }
    }

    public function redirectFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function callbackFacebook()
    {

        try {
            $user = Socialite::driver('facebook')->user();
        } catch (\Exception $e) {
            return  redirect('/');
        }
        // check if they're an existing user
        $existingUser = $this->model()::where(['social_id' => $user->id, 'login_type' => 'facebook'])->first();
        $check = $this->createRedirect($existingUser, $user, 'facebook');

        if ($check == 1) {
            return redirect()->route('login')->with('error', 'Tài khoản của bạn đã bị khóa!');
        }

        if ($check == 2 || $check == 3) {
            return redirect()->route('login')->with('error', 'Bạn không thể đăng nhập!');
        }
        return  redirect('/');
    }

    private function model()
    {
        return User::class;
    }
}
