<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class FormSubmitted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $fullUrl;
    public string $clientIp;

    /**
     * Create a new event instance.
     */
    public function __construct($fullUrl, $clientIp)
    {
        $this->fullUrl = $fullUrl;
        $this->clientIp = $clientIp;
    }
}
