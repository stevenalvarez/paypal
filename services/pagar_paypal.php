<?php
include 'config.php';
include 'functions.php';
require('paypal/paypal.php');

error_reporting(E_ALL);
ini_set("display_errors", 0);

//Enviamos el mail
$envio = enviar_contacto($_POST['name'], $_POST['phone'], $_POST['email'], $_POST['mensaje']);
$paypal = new paypal();

if($envio === true){
    echo "Su mensaje se ha enviado con exito, pronto responderemos. Estamos encantados de atenderle!!!";
}else{
    $nvpstr = "&L_NAME0=aportacion+a+Jhonny+Esteban+Alvarez+Villazante&L_AMT0=150&L_QTY0=1&MAXAMT=150&AMT=150&ITEMAMT=150&TAXAMT=0&ReturnUrl=http%3A%2F%2Flocalhost%3A80%2Fpatrocinalos_red_social%2Faplicacion%2Faportaciones%2Fadd%2F%3FcurrencyCodeType%3DEUR%26paymentType%3DSale&CANCELURL=http%3A%2F%2Flocalhost%3A80%2Fpatrocinalos_red_social%2Faplicacion%2Faportaciones%2Fadd%2F%3FpaymentType%3DSale&CURRENCYCODE=EUR&PAYMENTACTION=Sale";
    $resArray = $paypal->hash_call("SetExpressCheckout",$nvpstr);
    $ack = strtoupper($resArray["ACK"]);
	$token = urldecode($resArray["TOKEN"]);
	$payPalURL = PAYPAL_URL.$token;
    echo $payPalURL;
}

?>