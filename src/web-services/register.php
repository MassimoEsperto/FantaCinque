<?php
require 'connect_local.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if(trim($request->data->username) === '' || trim($request->data->email)=== '' )
  {
    header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'valori non prelevati', 'code' => 400)));
  }
  
  if(trim($request->data->password) === '' || trim($request->data->squadra)=== '' )
  {
    header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'valori non prelevati', 'code' => 400)));
  }
  
    // Sanitize.
	$username = mysqli_real_escape_string($con, trim($request->data->username));
	$email = mysqli_real_escape_string($con, trim($request->data->email));  
	$pass = mysqli_real_escape_string($con, trim($request->data->password));
	$squadra = mysqli_real_escape_string($con, trim($request->data->squadra));  
  
	$subject = "Richiesta Iscrizione fantacinque";

	$message = "
	<html>
	<head>
	<title>HTML email</title>
	</head>
	<body>
	<p>Richiesta Iscrizione fantacinque!</p>
	<table>
	<tr>
	<th>Username</th>
	<th>Email</th>
	</tr>
	<tr>
	<td>".$username."</td>
	<td>".$email."</td>
	</tr>
	</table>
	</body>
	</html>
	";

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: <fantacinque@shitcup.com>' . "\r\n";
  
  	$emailTo="em.decarlo@gmail.com";
  

	// Store.
	$sql = "INSERT INTO `utenti`(`username`,`email`,`password`,`squadra`) VALUES ('{$username}','{$email}','{$pass}','{$squadra}')";
  

	if(mysqli_query($con,$sql))
	{
    http_response_code(201);
    $ele = [
      'username' => $username,
      'email' => $email,
	  'squadra' => $squadra
    ];
	
    
	try {
    			mail($email,$subject,$message,$headers);
                echo json_encode(['data'=>$ele]);
		} catch (Exception $e) {
                header("HTTP/1.1 500 Internal Server Error");
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => $e->getMessage(), 'code' => 400)));
		}
  }
  else
  {
    header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'Valori già esistenti', 'code' => 400)));
  }
}
else
{
	die('valori non prelevati'. mysqli_error($con));
}
?>
