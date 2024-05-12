<?php

namespace App\Listeners;

use App\Events\FormSubmitted;
use App\Models\FormLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class FormSubmittedListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FormSubmitted $event): void
    {
        try {
            $attributes = collect([
                'url' => $event->fullUrl,
                'ip' => $event->clientIp
            ]);

            /** @var FormLog $formLog */
            $formLog = FormLog::query()->create($attributes->toArray());
            throw_unless($formLog, \Exception::class, 'Form log kaydedilemedi.');

        } catch (\Throwable $exception) {
            Log::info($exception->getMessage());
        }
    }
}
