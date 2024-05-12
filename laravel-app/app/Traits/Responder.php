<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait Responder
{

    /**
     * Return a success JSON response.
     *
     * @param string $message
     * @param  $payload
     * @param int $code
     * @return JsonResponse
     */
    protected static function success(string $message, $payload = null, int $code = 200): JsonResponse
    {
        return response()->json([
            'status' => $code,
            'success' => true,
            'message' => $message,
            'data' => $payload,
        ]);
    }

    /**
     * Return an error JSON response.
     *
     * @param string $message
     * @param int $code
     * @return JsonResponse
     */
    protected static function error(string $message, int $code = 500): JsonResponse
    {
        return response()->json([
            'status' => $code,
            'success' => false,
            'error' => [
                'code' => $code,
                'message' => $message,
            ],
        ], $code);
    }

}
