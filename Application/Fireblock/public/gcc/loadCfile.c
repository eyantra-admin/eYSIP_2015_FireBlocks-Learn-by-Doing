#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "firebird.h"



int main() {

	init_devices();
	while(1){
		if(((PINE & 0x80) == 0x80)){
		
			buzzer_on();
		}else{
		
			buzzer_on();
		}
	}

 return 0;
}