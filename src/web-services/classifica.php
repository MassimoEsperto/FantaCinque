<?php
/**
 * Returns the list of match.
 */
require 'connect_local.php';
    
$elements = [];

$sql = "SELECT c.girone,c.utente as id,sum(c.punti) as tot_pt,sum(c.goal) as tot_goal,u.squadra FROM( ";
$sql .="SELECT c.utente_casa as utente,sum(r.pt_casa) as punti,c.girone,sum(r.gol_casa) as goal ";
$sql .="FROM calendario c, risultati r ";
$sql .="WHERE c.id_partita=r.id_risultato AND r.calcolato=1 GROUP BY utente ";
$sql .="UNION ";
$sql .="SELECT c.utente_trasferta as utente,sum(r.pt_trasferta) as punti,c.girone,sum(r.gol_trasferta) as goal ";
$sql .="FROM calendario c, risultati r ";
$sql .="WHERE c.id_partita=r.id_risultato AND r.calcolato=1 GROUP BY utente ";
$sql .=")c ,utenti u WHERE u.id_utente=c.utente ";
$sql .="GROUP BY id ORDER BY  c.girone,tot_pt DESC ";




if($result = mysqli_query($con,$sql))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
 
		$elements[$ele]['girone'] = $row['girone'];
		$elements[$ele]['id_utente'] = $row['id'];
        $elements[$ele]['squadra'] = $row['squadra'];
		$elements[$ele]['punti'] = $row['tot_pt'];
		$elements[$ele]['gol'] = $row['tot_goal'];
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