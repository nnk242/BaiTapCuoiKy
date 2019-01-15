<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers\Controller;
use App\User;
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
        $this->middleware('auth:api', ['except' => ['login', 'index', 'logout']]);
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

    public function logout()
    {
        if(JWTAuth::invalidate(JWTAuth::getToken())){
            return response()->json(['message' => 'Successfully logged out']);
        }
    }
}
