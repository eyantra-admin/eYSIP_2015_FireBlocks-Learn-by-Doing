<?php
session_start();
$cc = "avr-gcc -g";
$cc2 = "avr-objcopy";
$file = $_SESSION['file'];
$fileinput = "loadCfile.c";
$fileinput2 = "loadCfile.o";
$fileinput3 = "loadCfile.elf";
$fileoutput = "loadCfile.hex";
$command1 = $cc." -mmcu=atmega2560 -c ".$fileinput;
$command2 = $cc." -mmcu=atmega2560 -o ".$fileinput3." ".$fileinput2;
$command3 = $cc2." -j .text -j .data -O ihex ".$fileinput3." ".$fileoutput;

$output = array();
$output2 = array();
$output3 = array();

$files = fopen($fileinput,"w");
fwrite($files,$file);
fclose($files);

exec($command1,$output,$return);
if(!$return){
	exec($command2,$output2,$return2);
	if(!$return2){
		exec($command3,$output3,$return3);
		if($return3){
			print_r($output3);
		}
	}else{
		print_r($output2);
	}
}else{
	echo "<pre>".print_r($output)."</pre>";
}

$filer = file_get_contents($fileinput);

echo "<pre>".$filer."</pre>";
