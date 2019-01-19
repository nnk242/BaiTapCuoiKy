<?php

namespace App\Http\Controllers\API;

use App\Component\Upload;
use Illuminate\Http\Request;
use Auth;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
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

//set model current class
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
        $credentials = ['email' => $request->username, 'password' => $request->password];

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => false]);
        }
        return $this->responseWithToken($token);
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

        return response()->json(['message' => true]);
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
            return response()->json(['message' => true]);
        return response()->json(['message' => true]);
    }

    /**
     * Check password
     *
     * @param $token
     * @return bool
     */
    public function checkPassword(Request $request)
    {
        if (Hash::check($request->password, $this->model()::find(Auth::id())->password))
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
                $validate = Validator::make($request->all(), [
                    'old_password' => 'required|string|max:6',
                    'new_password' => 'required|string|max:6'
                ]);
                if ($validate->fails()) {
                    $user->update(['password' => Hash::make($new_password)]);
                    return response()->json(['message' => true]);
                }
            }
        }
        return response()->json(['message' => false]);
    }

    public function uploadAvatar(Request $request)
    {
        $upload = new Upload();
        $user = $this->model()::findOrFail(Auth::id());
        $validate = Validator::make($request->all(), ['file' => 'required|mimes:png,jpg,jpeg|size:2048']);
        if ($validate->fails()) {
            $data = $upload->uploadAvatar($request->file, $user->avatar);

            if ($data['message']['status'] === true) {
                $user->update(['avatar' => $data['message']['path']]);
                return response()->json(['message' => true]);
            }
        }
        return response()->json(['message' => false]);
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
}
