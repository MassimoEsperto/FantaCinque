<?php
require 'connect_local.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	$dati= $request->data;
	
	// Sanitize.
	$id_utente = mysqli_real_escape_string($con, (int)$dati->id);
	$email = mysqli_real_escape_string($con, trim($dati->email)); 
	$squadra = mysqli_real_escape_string($con, trim($dati->squadra)); 
    $username = mysqli_real_escape_string($con, trim($dati->username)); 
	
	// Update.
	$sql = "UPDATE utenti SET username='{$username}',email='{$email}',squadra='{$squadra}' WHERE id_utente = {$id_utente} LIMIT 1";

	if(mysqli_query($con,$sql))
	{
		http_response_code(201);
	}
	else
	{
		header("HTTP/1.1 500 Internal Server Error");
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'query errata', 'code' => 400)));
	}
}
else
{
	die('valori non prelevati'. mysqli_error($con));
}
?>