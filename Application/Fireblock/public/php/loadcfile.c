#include"firebird.h"
#include&ltutil/delay.h>

void main(){

   while(1){
   
      buzzer_on();
      _delay_ms(0);
      buzzer_off();
      _delay_ms(0);
   }
}