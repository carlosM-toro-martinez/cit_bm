<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $response = ["success"  => false];

        $validator = Validator::make($request->all(),  [
            'name'      => 'required',
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        $input = $request->all();
        $input["password"] = bcrypt($input['password']);

        $user = User::create($input);

        $response["success"] = true;
        $response["token"] = $user->createToken('secretCIT')->plainTextToken;

        return response()->json($response, 200);
    }

    public function login(Request $request)
    {
        $response = ["success"  => false];

        $validator = Validator::make($request->all(),  [
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        if ($validator->fails()) {
            $response = ["error" => $validator->errors()];
            return response()->json($response, 200);
        }

        if (auth()->attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = auth()->user();
            $response['token'] = $user->createToken('secretCIT')->plainTextToken;
            $response['user'] = $user;
            $response['success'] = true;
        }

        return response()->json($response, 200);
    }

    public function logout()
    {
        $response = ["success"  => false];
        auth()->user()->tokens()->delete();
        $response = [
            'success' => true,
            "message" => "You have successfully logged"
        ];

        return response()->json($response, 200);
    }
}
