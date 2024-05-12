<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Mockery\Exception;
use Throwable;

class AuthController extends Controller
{

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $attributes = collect($request->validated());

            $password = $attributes->get('password');
            $attributes->put('password', bcrypt($password));

            /** @var User $user */
            $user = User::query()->create($attributes->toArray());
            throw_unless($user, \Exception::class, 'Kayıt olunamadı!');

            return $this->success('Başarılı bir şekilde kayıt işlemi tamamlandı..');
        } catch (Throwable $exception) {
            return $this->error($exception->getMessage());
        }
    }

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            if (!auth()->attempt($request->validated())) {
                throw new Exception('Hatalı giriş');
            }

            /** @var User $user */
            $user = auth()->user();
            $token = $user->createToken('auth')->plainTextToken;

            return $this->success(
                'Giriş işlemi başarılı.', [
                    'user_id' => $user->id,
                    'access_token' => $token
                ]
            );
        } catch (Throwable $exception) {
            return $this->error($exception->getMessage());
        }
    }

    public function logout(): JsonResponse
    {
        try {
            /** @var User $user */
            $user = auth()->user();

            $user->currentAccessToken()->delete();

            return $this->success('Çıkış başarılı');
        } catch (Throwable $exception) {
            return $this->error($exception->getMessage());
        }
    }
}
