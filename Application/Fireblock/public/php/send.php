<?php
session_start();
$file = $_SESSION['file'];

$myfile = fopen('../files/loadcfile.c', "w");

fwrite($myfile,$file);

echo $file;

header('Location:../gcc/compile.php'); 