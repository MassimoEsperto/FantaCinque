<?php
 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
$uploaddir = 'assets/upload/';
$risposta = 'ko';
$uploadfile = $uploaddir . basename($_FILES['myfile']['name']);
 
try{
     //unlink($uploadfile);
     move_uploaded_file($_FILES['myfile']['tmp_name'], $uploadfile);
     chmod($uploadfile,0777);  //permessi per poterci sovrascrivere/scaricare
     $risposta = 'ok';
	} 
	catch(Error $e) {
   		$risposta = $e;
	}
    
$ritono = [
			 'nome' => $uploadfile,
			 'risposta' => $risposta
		  ];
          
echo json_encode(['data'=>$ritono]);
       
?>