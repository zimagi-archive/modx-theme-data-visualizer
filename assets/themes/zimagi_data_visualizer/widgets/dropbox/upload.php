<?php

$filename = $_FILES['file']['name'];
$filedata = $_FILES['file']['tmp_name'];
$filesize = $_FILES['file']['size'];

include_once '../../../../../core/model/modx/modx.class.php';

$modx = new modX();

$token = $modx->getObject('modSystemSetting', 'dropbox.access_token');
// echo $token->get('value');
// die();
// echo $filename;
// die();
if ($filedata != ''){
    $api_url = 'https://content.dropboxapi.com/2/files/upload'; //dropbox api url
    // $postfields = array("filedata" => "@$filedata", "filename" => $filename);
    $token = $token->get('value');

    $headers = array('Authorization: Bearer '. $token,
        'Content-Type: application/octet-stream',
        'Dropbox-API-Arg: '.
        json_encode(
            array(
                "path"=> '/'.$_POST['path']. '/'.basename($filename),
                "mode" => "add",
                "autorename" => false,
                "mute" => false
            )
        )

    );

    $ch = curl_init($api_url);

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);

    $path = $filedata;
    $fp = fopen($path, 'rb');
    $filesize = filesize($path);

    // curl_setopt($ch, CURLOPT_POSTFIELDS, fread($fp, $filesize));
    curl_setopt($ch, CURLOPT_POSTFIELDS, fread($fp, $filesize));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//        curl_setopt($ch, CURLOPT_VERBOSE, 1); // debug

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    echo($response.'<br/>');
    echo($http_code.'<br/>');

    curl_close($ch);
}