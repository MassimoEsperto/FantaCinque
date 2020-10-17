<?php
require 'connect_local.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
	// Extract the data.
	$request = json_decode($postdata);
	

	// Validate.
	if(trim($request->data->username) === '' || trim($request->data->email)=== '' || trim($request->data->squadra)=== '' )
	{
		die('valori non prelevati'. mysqli_error($con));
	}
	
	// Sanitize.
	$username = mysqli_real_escape_string($con, trim($request->data->username));
	$email = mysqli_real_escape_string($con, trim($request->data->email)); 
	$squadra = mysqli_real_escape_string($con, trim($request->data->squadra)); 
	  

	// Update.
	$sql = "UPDATE `utenti` SET `email`='{$email}',`squadra`='{$squadra}' WHERE `username` = '{$username}' LIMIT 1";

	if(mysqli_query($con,$sql))
	{
		$ritono = [
					  'stato' => $con->affected_rows,
					  'risposta' => 'ok'
					];
		echo json_encode(['data'=>$ritono]);
	} 
	else 
	{
		header("HTTP/1.1 500 Internal Server Error");
		header('Content-Type: application/json; charset=UTF-8');
		die(json_encode(array('message' => 'valori sballati', 'code' => 400)));
	}
}
else
{
	die('valori non prelevati'. mysqli_error($con));
}
?>