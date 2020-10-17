<?php
/**
 * Returns the list of match.
 */
require 'connect_local.php';
    
$elements = [];

$sql = "SELECT c.id_partita,c.girone,c.giornata,u.squadra as casa,t.squadra as trasferta,r.gol_casa,r.gol_trasferta,r.calcolato ";
$sql .="FROM calendario c,utenti u,utenti t,risultati r ";
$sql .="WHERE u.id_utente=c.utente_casa and t.id_utente=c.utente_trasferta and r.id_risultato=c.id_partita ";
$sql .="ORDER BY  c.giornata,c.girone,c.id_partita ";


if($result = mysqli_query($con,$sql))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
 
		$elements[$ele]['partita'] = $row['id_partita'];
		$elements[$ele]['girone'] = $row['girone'];
		$elements[$ele]['giornata'] = $row['giornata'];
        $elements[$ele]['calcolato'] = $row['calcolato'];
		$elements[$ele]['casa'] = $row['casa'];
		$elements[$ele]['trasferta'] = $row['trasferta'];
        $elements[$ele]['gol_casa'] = $row['gol_casa'];
		$elements[$ele]['gol_trasferta'] = $row['gol_trasferta'];
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