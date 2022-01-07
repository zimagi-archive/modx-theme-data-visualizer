<?php

// $path = 'test_php_upload.txt';
// $fp = fopen($path, 'rb');
// $size = filesize($path);


$target_dir = "test/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$fp = fopen($_FILES["UploadFileName"]["tmp_name"], 'rb');
$size = filesize($_FILES["UploadFileName"]["tmp_name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


// echo '='.$size;
// die();

// Check if image file is a actual image or fake image
// if(isset($_POST["submit"])) {
    // echo $target_file;
    // die();
    $cheaders = array('Authorization: Bearer sl.A_jZvsh0O3ibkR6xi5K5_2N_4ArTJnSUe2B85cipzL40p862cMGTwPSTTp5OvLErzs_68AImGAFGOHCnSpM8vgi1VfUJfwcgWRTtpuJ1G1QTp56IyWVhMrDt98QhcJlI2Vju9eI',
                  'Content-Type: application/octet-stream',
                  'Dropbox-API-Arg: {"path":"/'.$target_file.'", "mode":"add"}');

    $ch = curl_init('https://content.dropboxapi.com/2/files/upload');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $cheaders);
    curl_setopt($ch, CURLOPT_PUT, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_INFILE, $fp);
    curl_setopt($ch, CURLOPT_INFILESIZE, $size);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);

    echo $response;
    curl_close($ch);
    fclose($fp);
//   $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
//   if($check !== false) {
//     echo "File is an image - " . $check["mime"] . ".";
//     $uploadOk = 1;
//   } else {
//     echo "File is not an image.";
//     $uploadOk = 0;
//   }
// }



?>