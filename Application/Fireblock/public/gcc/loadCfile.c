#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "firebird.h"



int main() {

	init_devices();
	while(1){
		buzzer_on();
		_delay_ms(1000);
		buzzer_off();
		_delay_ms(1000);
	}

 return 0;
}