'use strict';	
goog.provide('Blockly.Firebird.input');

goog.require('Blockly.Firebird');

Blockly.Firebird['io_buzzer'] = function(block) {
  // Math operators with single operand.
  
  var code;
  var arg;
  
      arg = Blockly.Firebird.valueToCode(block, 'buzzer',
  Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  
      code = 'buzzer_ms(' + arg + ');\n';
  Blockly.Firebird.interfacings_['Buzzer_interfacing'] = '\nBuzzer connections:\n\tBuzzer: PORTC 3';  
  Blockly.Firebird.definitions_['buzzer_on_function']= 'void buzzer_on (void)\n{\n\tPORTC = PORTC | 0x08; \t// Port C pin 3 = 1 (To turn the buzzer ON) and Bit masking is done so that rest pins status remain unchanged \n}\n';
  Blockly.Firebird.definitions_['buzzer_off_function']= 'void buzzer_off (void)\n{\n\tPORTC = PORTC & 0xF7; \t// Port C pin 3 = 0 (To turn the buzzer OFF) and Bit masking is done so that rest pins status remain unchanged \n}\n';
  Blockly.Firebird.definitions_['soft_left_2_function']= 'void buzzer_ms (int time)\n{\n\tbuzzer_on();\n\t_delay_ms(time); \t// delay \n\tbuzzer_off();\n}\n';
    return code;
};

Blockly.Firebird['io_switch'] = function(block) {
  // Math operators with single operand.
  
  Blockly.Firebird.interfacings_['switch_interfacing'] = '\nSwitch connections:\n\tInterrupt switch: PORTE 7 (INT7)';
  var operator = block.getFieldValue('status');
   var code;   
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'press':
  code = '((PINE & 0x80) != 0x80)';
    break;
    case 'not_press':
  code = '((PINE & 0x80) == 0x80)';
    break;
  }
     
 
    return [code, Blockly.Firebird.ORDER_ATOMIC];
};

Blockly.Firebird['io_ledbargraph'] = function(block) {
Blockly.Firebird.interfacings_['bargraph_LED_interfacing'] = '\nBargraph LED connections:\n\tLED bargraph: PORTJ 7 to PORTJ 0';
  // Math operators with single operand.
  
  
  var operator = block.getFieldValue('check');
  var operator1 = block.getFieldValue('LED_no');
   var code;   
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  if (operator == 'on') 
    {
      switch (operator1){
        case 'all':
      code = 'PORTJ = 0xFF; \t// Turn on all bargraph LEDs (connected to PORTJ) \n';
      break;
      case '1':
      code = 'PORTJ | = 0x01; \t// Turn on 1st bargraph LED (connected to PORTJ pin 0) \n';
      break;
      case '2':
      code = 'PORTJ | = 0x02; \t// Turn on 2nd bargraph LED (connected to PORTJ pin 1) \n';
      break;
      case '3':
      code = 'PORTJ | = 0x04; \t// Turn on 3rd bargraph LED (connected to PORTJ pin 2) \n';
      break;
      case '4':
      code = 'PORTJ | = 0x08; \t// Turn on 4th bargraph LED (connected to PORTJ pin 3) \n';
      break;
      case '5':
      code = 'PORTJ | = 0x10; \t// Turn on 5th bargraph LED (connected to PORTJ pin 4) \n';
      break;
      case '6':
      code = 'PORTJ | = 0x20; \t// Turn on 6th bargraph LED (connected to PORTJ pin 5) \n';
      break;
      case '7':
      code = 'PORTJ | = 0x40; \t// Turn on 7th bargraph LED (connected to PORTJ pin 6) \n';
      break;
      case '8':
      code = 'PORTJ | = 0x80; \t// Turn on 8th bargraph LED (connected to PORTJ pin 7) \n';
      break;
    }
}
  
  else
  {
      switch (operator1){
        case 'all':
      code = 'PORTJ = 0x00; \t// Turn off all bargraph LEDs (connected to PORTJ)\n';
      break;
      case '1':
      code = 'PORTJ & = 0xFE; \t// Turn off 1st bargraph LED (connected to PORTJ pin 0)\n';
      break;
      case '2':
      code = 'PORTJ & = 0xFD; \t// Turn off 2nd bargraph LED (connected to PORTJ pin 1)\n';
      break;
      case '3':
      code = 'PORTJ & = 0xFB; \t// Turn off 3rd bargraph LED (connected to PORTJ pin 2)\n';
      break;
      case '4':
      code = 'PORTJ & = 0xF7; \t// Turn off 4th bargraph LED (connected to PORTJ pin 3)\n';
      break;
      case '5':
      code = 'PORTJ & = 0xEF; \t// Turn off 5th bargraph LED (connected to PORTJ pin 4)\n';
      break;
      case '6':
      code = 'PORTJ & = 0xDF; \t// Turn off 6th bargraph LED (connected to PORTJ pin 5)\n';
      break;
      case '7':
      code = 'PORTJ & = 0xBF; \t// Turn off 7th bargraph LED (connected to PORTJ pin 6)\n';
      break;
      case '8':
      code = 'PORTJ & = 0x7F; \t// Turn off 8th bargraph LED (connected to PORTJ pin 7)\n';
      break;
    }
}
 
    return code;
};