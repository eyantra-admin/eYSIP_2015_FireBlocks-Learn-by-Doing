#define F_CPU 14745600
#include <avr/io.h>
#include <avr/interrupt.h>
#include <util/delay.h>
#include "firebird.h"


unsigned char ADC_Value;
unsigned char flag1 = 0;
unsigned char flag2 = 0;

unsigned char Left_white_line = 0;
unsigned char Center_white_line = 0;
unsigned char Right_white_line = 0;

unsigned char Front_Sharp_Sensor = 0;
unsigned char Front_IR_Sensor = 0;

int main() {

	init_devices();
	while(1){
		Left_white_line = ADC_Conversion(3);
		
		Center_white_line = ADC_Conversion(2);
		
		Right_white_line = ADC_Conversion(1);
		
		Front_Sharp_Sensor = ADC_Conversion(6);
		
		Front_IR_Sensor = ADC_Conversion(11);
		
		lcd_print(1,1,ADC_Conversion(3),3);
		lcd_print(1,5,ADC_Conversion(2),3);
		lcd_print(1,9,ADC_Conversion(1),3);
		lcd_print(2,4,ADC_Conversion(11),3);
		lcd_print(2,8,ADC_Conversion(6),3);
		flag1 = 0;
		
		flag2 = 0;
		
		if(Front_IR_Sensor > 0x82 && Front_Sharp_Sensor < 0xF0){
		
			flag2 = 1;
			
			stop();
			buzzer_on();
		}
		if(Center_white_line > 0x28 && flag2 == 0){
		
			flag1 = 1;
			
			buzzer_off();
			forward();
			velocity(200,200);
		}
		if(Right_white_line > Left_white_line && flag2 == 0){
		
			buzzer_off();
			forward();
			velocity(200,175);
		}
		if(Right_white_line < Left_white_line && flag2 == 0){
		
			buzzer_off();
			forward();
			velocity(175,200);
		}
		if(Center_white_line > 0x28 && Left_white_line > 0x28 && Right_white_line > 0x28 && flag2 == 0){
		
			buzzer_off();
			forward();
			velocity(200,200);
		}
	}

 return 0;
}