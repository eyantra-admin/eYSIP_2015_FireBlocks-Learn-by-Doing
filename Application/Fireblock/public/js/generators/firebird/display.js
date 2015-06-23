'use strict';		
goog.provide('Blockly.Firebird.display');

goog.require('Blockly.Firebird');

Blockly.Firebird['display_init'] = function(block) {
  
  var code= 'lcd_init();\n lcd_set_4_bit();\n';
  
  return (code);
};

Blockly.Firebird['display_cursor'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('position');
  var code;
  var arg;
  
      arg = Blockly.Firebird.valueToCode(block, 'Cursor',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
 
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'row':
      code = 'row_pos= ' + arg + ';\n';
      break;
    case 'column':
      code = 'column_pos= ' + arg + ';\n';
      break;
   
  }
 
    return (code);
};

Blockly.Firebird['display_channel'] = function(block) {
  // Math operators with single operand.
  
  var code;
  
  var arg = Blockly.Firebird.valueToCode(block, 'Channel',
        Blockly.Firebird.ORDER_ATOMIC) || '0';
 
// document.write(arg);
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (arg) {
  case '0' : 
      code = 'Block not connected to display value of()';
      break;
  case 'ADC_Conversion(2)':
      code = 'C= ' + arg + ';\nlcd_print(row_pos,column_pos,C,3);\n';
      break;
  case 'ADC_Conversion(3)':
      code = 'L= ' + arg + ';\nlcd_print(row_pos,column_pos,L,3);\n';
      break;
	case 'ADC_Conversion(1)':
      code = 'R= ' + arg + ';\nlcd_print(row_pos,column_pos,R,3);\n';
      break;
  case 'ADC_Conversion(4)':
      code = 'ir1= ' + arg + ';\nlcd_print(row_pos,column_pos,ir1,3);\n';
	  break;
	case 'ADC_Conversion(5)':
      code = 'ir2= ' + arg + ';\nlcd_print(row_pos,column_pos,ir2,3);\n';
	  break;
	case 'ADC_Conversion(6)':
      code = 'ir3= ' + arg + ';\nlcd_print(row_pos,column_pos,ir3,3);\n';
	  break;
	case 'ADC_Conversion(7)':
      code = 'ir4= ' + arg + ';\nlcd_print(row_pos,column_pos,ir4,3);\n';
	  break;
	case 'ADC_Conversion(8)':
      code = 'ir5= ' + arg + ';\nlcd_print(row_pos,column_pos,ir5,3);\n';
	  break;
	case 'spi_master_tx_and_rx(5)':
      code = 'ir6= ' + arg + ';\nlcd_print(row_pos,column_pos,ir6,3);\n';
	  break;
	case 'spi_master_tx_and_rx(6)':
      code = 'ir7= ' + arg + ';\nlcd_print(row_pos,column_pos,ir7,3);\n';
	  break;
	case 'spi_master_tx_and_rx(7)':
      code = 'ir8= ' + arg + ';\nlcd_print(row_pos,column_pos,ir8,3);\n';
      break;
  case 'sharp_fr(9)':
      code = 'sharp1= ' + arg + ';\nlcd_print(row_pos,column_pos,sharp1,3);\n';
      break;
  case 'sharp_fr(10)':
      code = 'sharp2= ' + arg + ';\nlcd_print(row_pos,column_pos,sharp2,3);\n';
      break;
	case 'sharp_fr(11)':
      code = 'sharp3= ' + arg + ';\nlcd_print(row_pos,column_pos,sharp3,3);\n';
      break;
  case 'sharp_fr(12)':
      code = 'sharp4= ' + arg + ';\nlcd_print(row_pos,column_pos,sharp4,3);\n';
	  break;
	case 'sharp_fr(13)':
      code = 'sharp5= ' + arg + ';\nlcd_print(row_pos,column_pos,sharp5,3);\n';	
  }
 
  return (code);
};

Blockly.Firebird['logic_compare1'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NE': '!=',
    'LT': '<',
    'LE': '<=',
    'GT': '>',
    'GE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
 
  var argument0 = Blockly.Firebird.valueToCode(block, 'A', Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Firebird.valueToCode(block, 'B', Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};