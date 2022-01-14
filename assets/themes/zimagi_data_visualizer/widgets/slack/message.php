<?php

include_once '../../../../../core/model/modx/modx.class.php';

$modx = new modX();

$webhook = $modx->getObject('modSystemSetting', 'slack.webhook');
if ($webhook) {

     // Create a constant to store your Slack URL
    define('SLACK_WEBHOOK', $webhook->get('value'));

}

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
if($_POST['message'] && $_POST['channel']){
    slack($_POST['message'],$_POST['channel']);//
}

