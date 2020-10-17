<?php

require 'connect_local.php';

// Extract, validate and sanitize the id.
$username = ($_GET['username'] !== null && $_GET['username'] !== '')? mysqli_real_escape_string($con, trim($_GET['username'])) : false;


if(!$username)
{
  die('valori non prelevati'. mysqli_error($con));
}

// Delete.
$sql = "DELETE FROM `utenti` WHERE `username` ='{$username}' LIMIT 1";

if(mysqli_query($con, $sql))
{
	http_response_code(204);
}
else
{
	header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'query errata', 'code' => 400)));
}
?>