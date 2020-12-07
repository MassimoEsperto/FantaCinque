<?php
/**
 * Returns the list of user.
 */
require 'connect_local.php';
    
$element = [];

$sql = "SELECT u.id_utente,u.squadra,l.nome_calciatore as nome,l.ruolo  "; 
$sql .="FROM lista_calciatori l,rosa_utente a,utenti u   ";
$sql .="WHERE a.id_utente=u.id_utente and a.id_calciatore=l.id_calciatore  ";
$sql .="ORDER BY u.squadra,l.ruolo DESC ";

if($result = mysqli_query($con,$sql))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
		$element[$ele]['squadra'] = $row['squadra'];
        $element[$ele]['id_utente'] = $row['id_utente'];
		$element[$ele]['calciatore'] = $row['nome'];
		$element[$ele]['ruolo'] = $row['ruolo'];
		$ele++;
	}
    
	echo json_encode(['data'=>$element]);
}
else
{
	header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'query errata', 'code' => 400)));
}
?>