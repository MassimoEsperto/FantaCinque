<?php

require 'connect_local.php';

$id_user = $_GET['id_user'];($_GET['id_user'] !== null && $_GET['id_user'] !== '')? mysqli_real_escape_string($con, (int)$_GET['id_user']) : false;

 // Validate.
if(trim($id_user) === '')
{
   die('valori non prelevati'. mysqli_error($con));
}


$sql = "SELECT id_calciatore as id,calciatore as nome,ruolo as tipo "; 
$sql .="FROM liste WHERE id_utente='{$id_user}' ORDER BY id ";

$result = mysqli_query( $con , $sql );

if(! $result ) 
{
   die('query failed'. mysqli_error($con));
}

if ($result->num_rows > 0) 
{
	$rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
	}

 	echo json_encode(['data'=>$rows]);

} 
else 
{
	 header("HTTP/1.1 500 Internal Server Error");
     header('Content-Type: application/json; charset=UTF-8');
     die(json_encode(array('message' => 'Rosa inesistente', 'code' => 400)));
}

?>