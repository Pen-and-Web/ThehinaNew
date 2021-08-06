<?php
$name = $_POST['name'];
$email = $_POST['email'];
$number = $_POST['number'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$form=" From: $name \n Phone: $number \n Subject: $subject \n Message: $message";
$recipient = "admin@thehina.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $form, $mailheader) or die("Error!");
echo "<h1> Thank You! </h1>";
$url = $_SERVER['HTTP_REFERER']; // right back to the referrer page from where you came.
echo '<meta http-equiv="refresh" content="5;URL=' . $url . '">';
?>
