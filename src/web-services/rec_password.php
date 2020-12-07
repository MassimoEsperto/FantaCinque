<?php

require 'connect_local.php';

$user = $_GET['user'];($_GET['user'] !== null && $_GET['user'] !== '')? mysqli_real_escape_string($con, $_GET['user']) : false;
$email = $_GET['email'];($_GET['email'] !== null && $_GET['email'] !== '')? mysqli_real_escape_string($con, $_GET['email']) : false;

$pass='';

 // Validate.
if(trim($user) === '' || trim($email) === '')
{
    die('valori non prelevati'. mysqli_error($con));
}
  
  
	$subject = "Richiesta Password WorldWideFantashit";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: <WorldWideFantashit@shitcup.com>' . "\r\n";



$sql = "select password from utenti where email = '{$email}' and username='{$user}' LIMIT 1"; 

$result = mysqli_query( $con , $sql );

if(!$result) 
{
        die('query failed'. mysqli_error($con));
}
else
{
  
	while($row = mysqli_fetch_assoc($result))
	{
		$pass = $row['password'];
	}
		
		$message = "
		<html>
		<head>
		<title>HTML email</title>
		</head>
		<body>
		<p>Richiesta password dimenticata!</p>
		<table>
		<tr>
		<th>La tua password</th>
		</tr>
		<tr>
		<td>".$pass."</td>
		</tr>
		</table>
		<br>
		<a href='http://fantashitcup.altervista.org/fantacinque/index.html'>Visit FantaCinque.com!</a>
		</body>
		</html>
		";
		
	if($pass!='')
	{
    	try {
    			mail($email,$subject,$message,$headers);
		} catch (Exception $e) {
                header("HTTP/1.1 500 Internal Server Error");
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => $e->getMessage(), 'code' => 400)));
		}
    	       
	}else{
    			header("HTTP/1.1 500 Internal Server Error");
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'Query errata!', 'code' => 400)));
    }
	
	
}
?>
