<?php

require 'connect_local.php';


$id_user = $_GET['id_user'];($_GET['id_user'] !== null && $_GET['id_user'] !== '')? mysqli_real_escape_string($con, (int)$_GET['id_user']) : false;

 // Validate.
if(trim($id_user) === '')
{
	header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'valori non prelevati', 'code' => 400)));
 
}

$sql  ="SELECT c.id_partita,0 as id_calciatore,'' as nome_calciatore FROM data_partite d ,calendario c  "; 
$sql .="WHERE c.giornata=d.giornata and (c.utente_casa='{$id_user}' ||c.utente_trasferta='{$id_user}') and d.data_giornata>now()  "; 
$sql .="LIMIT 1 union ";
$sql .="SELECT f.id_partita,f.id_calciatore, l.nome_calciatore FROM formazioni f,lista_calciatori l WHERE f.id_calciatore = l.id_calciatore ";

$sql .="AND f.id_partita=( SELECT c.id_partita FROM data_partite d ,calendario c   ";
$sql .="WHERE c.giornata=d.giornata and (c.utente_casa='{$id_user}' ||c.utente_trasferta='{$id_user}') and d.data_giornata>now()  ";
$sql .="ORDER BY c.giornata LIMIT 1)  ";

if($result = mysqli_query($con,$sql))
{
	$ele = 0;
	while($row = mysqli_fetch_assoc($result))
	{
		$element[$ele]['id_partita'] = $row['id_partita'];
		$element[$ele]['id_calciatore'] = $row['id_calciatore'];
        $element[$ele]['nome_calciatore'] = $row['nome_calciatore'];
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