'use strict';	

goog.provide('Blockly.Firebird.sensor');

goog.require('Blockly.Firebird');

Blockly.Firebird['sensor_white'] = function(block) {
  // Numeric value.
  var arg = block.getFieldValue('line_sensor');
  var code;
   switch (arg) {
    case 'center':
      code = 'ADC_Conversion(2)';
      break;
    case 'left':
      code = 'ADC_Conversion(3)';
      break;
	 case 'right':
      code = 'ADC_Conversion(1)';
      break;
   
  }
 return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};

Blockly.Firebird['sensor_sharp'] = function(block) {
  // Numeric value.
  var arg = block.getFieldValue('sharp');
  var code;
   switch (arg) {
    case 'fr':
      code = 'sharp_fr(11)';
      break;
    case 'lf':
      code = 'sharp_fr(9)';
      break;
	 case 'rf':
      code = 'sharp_fr(13)';
      break;
	 case 'ld':
      code = 'sharp_fr(10)';
      break;
	 case 'rd':
      code = 'sharp_fr(12)';
      break;
   
  }
 return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};

Blockly.Firebird['sensor_ir'] = function(block) {
  // Numeric value.
  var arg = block.getFieldValue('ir');
  var code = arg;
   /*switch (arg) {
    case 'fr':
      code = "ADC_Conversion(6)";
      break;
    case 'lf':
      code = 'ADC_Conversion(4)';
      break;
	 case 'rf':
      code = 'ADC_Conversion(8)';
      break;
	 case 'ld':
      code = 'ADC_Conversion(5)';
      break;
	 case 'rd':
      code = 'ADC_Conversion(7)';
      break;
	   case 'bk':
      code = 'spi_master_tx_and_rx(6)';
      break;
	 case 'lb':
      code = 'spi_master_tx_and_rx(7)';
      break;
	 case 'rb':
      code = 'spi_master_tx_and_rx(5)';
      break;
   
  }*/
 return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};