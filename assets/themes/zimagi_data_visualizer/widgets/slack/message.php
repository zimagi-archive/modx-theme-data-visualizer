<?php

// Create a constant to store your Slack URL
define('SLACK_WEBHOOK', $_POST['hook']);

function slack($message, $channel)
{

    // Make your message
    $msg = array('payload' => json_encode(array('text' => $message, 'channel' => $channel)));
    $c = curl_init(SLACK_WEBHOOK);
    curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($c, CURLOPT_POST, true);
    curl_setopt($c, CURLOPT_POSTFIELDS, $msg);
    curl_exec($c);
    curl_close($c);

    return $result;
}
// Use curl to send your message
slack($_POST['message'],$_POST['channel']);//
