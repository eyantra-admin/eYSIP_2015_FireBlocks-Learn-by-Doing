'use strict';	

goog.provide('Blockly.Firebird.sensor');

goog.require('Blockly.Firebird');

Blockly.Firebird['sensor_white'] = function(block) {
  // Numeric value.
  var arg = block.getFieldValue('line_sensor');
  var code;
  Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
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
  Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
  Blockly.Firebird.definitions_['sharpgp2d_function']= 'unsigned int Sharp_GP2D12_estimation(unsigned char adc_reading)\n{\n\tfloat distance;\n\tunsigned int distanceInt;\n\tdistance = (int)(10.00*(2799.6*(1.00/(pow(adc_reading,1.1546)))));\n\tdistanceInt = (int)distance;\n\tif(distanceInt>800)\n\t{\n\t\tdistanceInt=800;\n\t}\n\treturn distanceInt;\n}\n';
  Blockly.Firebird.definitions_['sharp_con_function']= 'unsigned int sharp_Conversion(unsigned char Ch)\n{\n\tunsigned int sharp;\n\tunsigned char avlue;\n\tvalue = ADC_Conversion(Ch);\n\tsharp = Sharp_GP2D12_estimation(value);\n\treturn sharp;\n}\n';
   switch (arg) {
    case 'fr':
      code = 'sharp_Conversion(11)';
      break;
    case 'lf':
      code = 'sharp_Conversion(9)';
      break;
	 case 'rf':
      code = 'sharp_Conversion(13)';
      break;
	 case 'ld':
      code = 'sharp_Conversion(10)';
      break;
	 case 'rd':
      code = 'sharp_Conversion(12)';
      break;
   
  }
 return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};

Blockly.Firebird['sensor_ir'] = function(block) {
  // Numeric value.
  var arg = block.getFieldValue('ir');
  var code = arg;

   switch (arg) {
    case 'fr':
    Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
      code = "ADC_Conversion(6)";
      break;
    case 'lf':
    Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
      code = 'ADC_Conversion(4)';
      break;
	 case 'rf':
   Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
      code = 'ADC_Conversion(8)';
      break;
	 case 'ld':
   Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
      code = 'ADC_Conversion(5)';
      break;
	 case 'rd':
   Blockly.Firebird.definitions_['ADC_con_function']= 'unsigned char ADC_Conversion(unsigned char Ch)\n{\n\tunsigned char a;\n\tif(Ch>7)\n\t{\n\t\tADCSRB = 0x08;\n\t}\n\tCh = Ch & 0x07;\n\tADMUX= 0x20| Ch;\n\tADCSRA = ADCSRA | 0x40;   //Set start conversion bit\n\twhile((ADCSRA&0x10)==0);  //Wait for ADC conversion to complete\n\ta=ADCH;\n\tADCSRA = ADCSRA|0x10; //clear ADIF (ADC Interrupt Flag) by writing 1 to it\n\tADCSRB = 0x00;\n\treturn a;\n}\n';
      code = 'ADC_Conversion(7)';
      break;
	   case 'bk':
     Blockly.Firebird.definitions_['ADC_con5_function']= 'unsigned char spi_master_tx_and_rx (unsigned char data)\n{\n\tunsigned char rx_data = 0;\n\tPORTB = PORTB & 0xFE; // make SS pin low\n\tSPDR = data;\n\twhile(!(SPSR & (1<<SPIF))); //wait for data transmission to complete\n\t_delay_ms(1); //time for ADC conversion in the slave microcontroller\n\tSPDR = 0x50; // send dummy byte to read back data from the slave microcontroller\n\twhile(!(SPSR & (1<<SPIF))); //wait for data reception to complete\n\trx_data = SPDR;\n\tPORTB = PORTB | 0x01; // make SS high\n\treturn rx_data;\n}\n';
      code = 'spi_master_tx_and_rx(6)';
      break;
	 case 'lb':
   Blockly.Firebird.definitions_['ADC_con5_function']= 'unsigned char spi_master_tx_and_rx (unsigned char data)\n{\n\tunsigned char rx_data = 0;\n\tPORTB = PORTB & 0xFE; // make SS pin low\n\tSPDR = data;\n\twhile(!(SPSR & (1<<SPIF))); //wait for data transmission to complete\n\t_delay_ms(1); //time for ADC conversion in the slave microcontroller\n\tSPDR = 0x50; // send dummy byte to read back data from the slave microcontroller\n\twhile(!(SPSR & (1<<SPIF))); //wait for data reception to complete\n\trx_data = SPDR;\n\tPORTB = PORTB | 0x01; // make SS high\n\treturn rx_data;\n}\n';
      code = 'spi_master_tx_and_rx(7)';
      break;
	 case 'rb':
   Blockly.Firebird.definitions_['ADC_con5_function']= 'unsigned char spi_master_tx_and_rx (unsigned char data)\n{\n\tunsigned char rx_data = 0;\n\tPORTB = PORTB & 0xFE; // make SS pin low\n\tSPDR = data;\n\twhile(!(SPSR & (1<<SPIF))); //wait for data transmission to complete\n\t_delay_ms(1); //time for ADC conversion in the slave microcontroller\n\tSPDR = 0x50; // send dummy byte to read back data from the slave microcontroller\n\twhile(!(SPSR & (1<<SPIF))); //wait for data reception to complete\n\trx_data = SPDR;\n\tPORTB = PORTB | 0x01; // make SS high\n\treturn rx_data;\n}\n';
      code = 'spi_master_tx_and_rx(5)';
      break;
   
  }
 return [code, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};