<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser()
    {
        try {
            /** @var User $user */
            $user = auth()->user();
            $user->load('userType');

            return UserResource::make($user);
        } catch (\Throwable $exception) {
            return $this->error($exception->getMessage());
        }
    }
}
