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
     
 Blockly.Firebird.definitions_['buzzer_on_function']= 'void buzzer_on (void)\n{\n\tPORTC = PORTC | 0x08;\n}\n';
      Blockly.Firebird.definitions_['buzzer_off_function']= 'void buzzer_off (void)\n{\n\tPORTC = PORTC & 0xF7;\n}\n';
  Blockly.Firebird.definitions_['soft_left_2_function']= 'void buzzer_ms (int time)\n{\n\tbuzzer_on();\n\t_delay_ms(time);\n\tbuzzer_off();\n}\n';
    return code;
};

Blockly.Firebird['io_switch'] = function(block) {
  // Math operators with single operand.
  
  
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
      code = 'PORTJ = 0xFF;\n';
      break;
      case '1':
      code = 'PORTJ | = 0x01;\n';
      break;
      case '2':
      code = 'PORTJ | = 0x02;\n';
      break;
      case '3':
      code = 'PORTJ | = 0x04;\n';
      break;
      case '4':
      code = 'PORTJ | = 0x08;\n';
      break;
      case '5':
      code = 'PORTJ | = 0x10;\n';
      break;
      case '6':
      code = 'PORTJ | = 0x20;\n';
      break;
      case '7':
      code = 'PORTJ | = 0x40;\n';
      break;
      case '8':
      code = 'PORTJ | = 0x80;\n';
      break;
    }
}
  
  else
  {
      switch (operator1){
        case 'all':
      code = 'PORTJ = 0x00;\n';
      break;
      case '1':
      code = 'PORTJ & = 0xFE;\n';
      break;
      case '2':
      code = 'PORTJ & = 0xFD;\n';
      break;
      case '3':
      code = 'PORTJ & = 0xFB;\n';
      break;
      case '4':
      code = 'PORTJ & = 0xF7;\n';
      break;
      case '5':
      code = 'PORTJ & = 0xEF;\n';
      break;
      case '6':
      code = 'PORTJ & = 0xDF;\n';
      break;
      case '7':
      code = 'PORTJ & = 0xBF;\n';
      break;
      case '8':
      code = 'PORTJ & = 0x7F;\n';
      break;
    }
}
 
    return code;
};