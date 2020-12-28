<?php
/**
 * Returns the list of match.
 */
require 'connect_local.php';
    
$elements = [];

$sql = "SELECT r.calcolato,c.giornata ";
$sql .="FROM risultati r,calendario c ";
$sql .="WHERE r.id_risultato=c.id_partita ";
$sql .="GROUP BY c.giornata ";


if($result = mysqli_query($con,$sql))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
		$elements[$ele]['giornata'] = $row['giornata'];
		$elements[$ele]['calcolato'] = $row['calcolato'];
		$ele++;
	}
    
	echo json_encode(['data'=>$elements]);
}
else
{
	header("HTTP/1.1 500 Internal Server Error");
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'ERROR', 'code' => 404)));
}

?>