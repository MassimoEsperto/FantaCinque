<?php
 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
$uploaddir = '../assets/upload/';
$risposta = 'ko';
$uploadfile = $uploaddir . basename($_FILES['myfile']['name']);
 
try{
     //unlink($uploadfile);
     move_uploaded_file($_FILES['myfile']['tmp_name'], $uploadfile);
     chmod($uploadfile,0777);  //permessi per poterci sovrascrivere/scaricare
     $risposta = 'ok';
	} 
catch(Error $e) {
	header("HTTP/1.1 500 Internal Server Error");
	header('Content-Type: application/json; charset=UTF-8');
	die(json_encode(array('message' => 'errato caricamento', 'code' => 400)));
}
    
$ritono = [
			 'nome' => $uploadfile,
			 'risposta' => $risposta
		  ];
          
echo json_encode(['data'=>$ritono]);
       
?>
