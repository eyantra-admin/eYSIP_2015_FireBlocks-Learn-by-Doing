<?php

$path = getcwd();

echo exec("avr-gcc -g -Os -mmcu=atmega2560 -c ../php/files/loadfile.c");
echo exec("avr-gcc -g -mmcu=atmega2560 -o ".$path."/loadcfile.elf ".$path."/loadcfile.o");
echo exec("avr-objcopy -j .text -j .data -O ihex ".$path."/loadcfile.elf ".$path."/loadcfile.hex");





