<?php

require 'connect_local.php';

//da aggiungere la clausula che inibisce i giocatori doppioni
//la tabella anon avra un id_utente ma una chiave esterna alla tabella appartenenza
//la nuova tabella appartenenza avra id_tente e id_calciatore

$id_user = $_GET['id_user'];($_GET['id_user'] !== null && $_GET['id_user'] !== '')? mysqli_real_escape_string($con, (int)$_GET['id_user']) : false;

 // Validate.
if(trim($id_user) === '')
{
   die('valori non prelevati'. mysqli_error($con));
}

 
$sql = "SELECT l.id_calciatore as id,l.nome_calciatore as nome,l.ruolo as tipo,false as disabled "; 
$sql .="FROM lista_calciatori l,rosa_utente a ";
$sql .="WHERE a.id_utente='{$id_user}' and a.id_calciatore=l.id_calciatore ";
$sql .="ORDER BY tipo DESC,id ";

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
     die(json_encode(array('message' => 'Rosa inesistente', 'code' => 400)));
}

?>