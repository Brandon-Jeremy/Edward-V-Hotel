<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RequestFeedback extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    // public function __construct($name, $email, $message)
    // {
    //     $this->name = $name;
    //     $this->email = $email;
    //     $this->message = is_string($message) ? $message : '';    
    // }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('brandonnader1@gmail.com')
                    ->view('emails.my-custom-email');
    }
}
