#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "firebird.h"



int main() {

	init_devices();
	init_devices();
	lcd_init();
	lcd_set_4bit();
	
	while(1){
		lcd_print(1,1,sharp_Conversion(11),3);
		if(sharp_Conversion(11) > 100 || sharp_Conversion(11) == 0x00){
		
			forward();
		}else{
		
			stop();
		}
	}

 return 0;
}