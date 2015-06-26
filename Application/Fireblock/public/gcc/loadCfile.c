#include <avr/io.h>
#include "firebird.h"



int main() {

	init_devices();
	while(1){
	
		forward_mm(60);
		buzzer_ms(3000);
		back_mm(60);
	}

 return 0;
}