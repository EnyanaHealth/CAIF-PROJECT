<?php
 //Database connection
$conn = new mysqli('localhost','root','root','amatuungo_aid');
if($conn === false){
  die('Connection Failed : ');
}else{
  echo('Connection Successful');
}
?>