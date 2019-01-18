<?php

namespace App\Http\Controllers\API;

use App\Rules\ValidPassword;
use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new API/AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'index', 'logout', 'uploadAvatar']]);
    }

    protected function model()
    {
        return User::class;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return 1;
    }

    /**
     * action login.
     *
     * @param \Illuminate\Http\Request $request
     * @return response()->json()
     */
    public function login(Request $request)
    {
        $email = $request->username;
        $password = $request->password;
        $credentials = ['email' => $email, 'password' => $password];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized', 'code' => 401], 401);
        }


        return $this->responseWithToken($token);
    }

    /**
     * get token and author.
     *
     * @param $token
     * @return response()->json()
     */
    public function responseWithToken($token)
    {
        return response()->json(
            [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        );
    }

    /**
     * get user info.
     *
     * @param $token
     * @return response()->json()
     */
    public function getUserInfo()
    {
        return auth()->user();
    }

    /**
     * get user info.
     *
     * @param $token
     * @return response()->json()
     */
    public function updateUserInfo(Request $request)
    {
        $user = $this->model()::findOrFail(Auth::id());

        $user->update([
            'last_name' => $request->last_name,
            'name' => $request->name,
            'birth_day' => date('Y-m-d', strtotime($request->birth_day)),
            'phone' => $request->phone,
            'gender' => $request->gender,
        ]);

        return response()->json(['message' => date('Y-m-d', strtotime($request->birth_day))]);
    }

    /**
     * Logout.
     *
     * @param $token
     * @return response()->json()
     */
    public function logout()
    {
        if (JWTAuth::invalidate(JWTAuth::getToken()))
            return response()->json(['message' => 'Successfully logged out']);
        else
            return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Check password
     *
     * @param $token
     * @return bool
     */
    public function checkPassword(Request $request)
    {
        $password = $request->password;
        if (Hash::check($password, $this->model()::find(Auth::id())->password))
            return response()->json(['message' => true]);
        else
            return response()->json(['message' => false]);
    }

    /**
     * Check password
     *
     * @param $token
     * @return bool
     */
    public function changePassword(Request $request)
    {
        $user = $this->model()::findOrFail(Auth::id());
        $old_password = $request->old_password;
        $new_password = $request->new_password;
        if (Hash::check($old_password, $user->password)) {
            if ($old_password === $new_password) {
                return response()->json(['message' => true]);
            } else {
                $request->validate([
                    'old_password' => ['required', 'string', new ValidPassword()],
                    'new_password' => ['required', 'string', new ValidPassword()]
                ]);
                $user->update(
                    [
                        'password' => Hash::make($new_password)
                    ]
                );
                return response()->json(['message' => true]);
            }
        }
        return response()->json(['message' => false]);
    }

    public function uploadAvatar()
    {
        return response()->json(['message' => true]);
    }
}
