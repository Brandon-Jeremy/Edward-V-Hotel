<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PointsNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $pointsmailData;


    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pointsmailData)
    {
        $this->pointsmailData = $pointsmailData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('brandonnader1@gmail.com')
                    ->view('emails.points-notification');
    }
}
