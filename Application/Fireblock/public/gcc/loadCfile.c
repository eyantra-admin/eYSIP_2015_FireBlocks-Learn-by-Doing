#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "firebird.h"



int main() {

	init_devices();
	lcd_print_text(0,0,"text,");

 return 0;
}