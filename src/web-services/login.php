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

if(! $result ) 
{
   header("HTTP/1.1 500 Internal Server Error");
   header('Content-Type: application/json; charset=UTF-8');
   die(json_encode(array('message' => 'query fallita', 'code' => 400)));
}

if ($result->num_rows > 0) 
{
	$rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
	}

 	echo json_encode(['data'=>$rows[0]]);

} 
else 
{
	 header("HTTP/1.1 500 Internal Server Error");
     header('Content-Type: application/json; charset=UTF-8');
     die(json_encode(array('message' => 'Dati errati!', 'code' => 400)));
}

?>