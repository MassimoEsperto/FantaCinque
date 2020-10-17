<?php

require 'connect_local.php';

$giornata = $_GET['giornata'];($_GET['giornata'] !== null && $_GET['giornata'] !== '')? mysqli_real_escape_string($con, $_GET['giornata']) : false;


 // Validate.
if(trim($giornata) === '')
{
   die('valori non prelevati'. mysqli_error($con));
}


$sql = "SELECT f.id_partita,c.girone,u.squadra,f.id_utente,f.schieramento,f.id_calciatore,l.calciatore,l.ruolo,f.voto ";
$sql .="FROM formazioni f,calendario c, liste l , utenti u ";
$sql .="WHERE f.id_partita=c.id_partita and l.id_calciatore=f.id_calciatore and u.id_utente=f.id_utente and c.giornata='{$giornata}' "; 
$sql .="ORDER BY f.id_partita,CASE WHEN f.id_utente = c.utente_casa THEN 1 ELSE 2 END,f.id_utente,f.schieramento ";

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
     die(json_encode(array('message' => 'giornata inesistente', 'code' => 400)));
}

?>