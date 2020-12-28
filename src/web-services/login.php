<?php

require 'connect_local.php';

$user = $_GET['user'];($_GET['user'] !== null && $_GET['user'] !== '')? mysqli_real_escape_string($con, $_GET['user']) : false;
$pass = ($_GET['pass'] !== null && $_GET['pass'] !== '')? mysqli_real_escape_string($con, $_GET['pass']) : false;


 // Validate.
if(trim($user) === '' || trim($pass) === '')
{
   die('valori non prelevati'. mysqli_error($con));
}

$sql = "select id_utente,username,email,ruolo,squadra from utenti where password = '{$pass}' and username='{$user}'"; 

$result = mysqli_query( $con , $sql );


	 header("HTTP/1.1 500 Internal Server Error");
     header('Content-Type: application/json; charset=UTF-8');
     die(json_encode(array('message' => 'Versione Locale Obsoleta', 'code' => 400)));


?>