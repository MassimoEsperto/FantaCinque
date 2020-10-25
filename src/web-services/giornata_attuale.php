
<?php
/**
 * Returns the list of user.
 */
require 'connect_local.php';

$giornata='';
$sql = "SELECT giornata FROM `data_partite` WHERE data_giornata>now()";
$sql .="ORDER BY giornata LIMIT 1";

if($result = mysqli_query($con,$sql))
{
	while($row = mysqli_fetch_assoc($result))
	{
		$giornata = $row['giornata'];
	}
    
	echo json_encode(['data'=>$giornata]);
}
else
{
	header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'query errata', 'code' => 400)));
}
?>