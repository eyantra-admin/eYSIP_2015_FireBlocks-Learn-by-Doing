'use strict';

goog.provide('Blockly.Firebird.function');

goog.require('Blockly.Firebird');
Blockly.Firebird.addReservedWords('Math');
Blockly.Firebird['pin'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('pin');
  // -4.abs() returns -4 in Firebird due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  //var order = code < 0 ?
     // Blockly.Firebird.ORDER_UNARY_PREFIX : Blockly.Firebird.ORDER_ATOMIC;
   return [code, Blockly.Firebird.ORDER_ATOMIC];
};

Blockly.Firebird['devices'] = function(block) {
  // Numeric value.
  var operator = block.getFieldValue('device');
  var code;
  switch (operator)
  {
    case 'buzz':
    Blockly.Firebird.interfacings_['Buzzer_interfacing'] = '\nBuzzer connections:\n\tBuzzer: PORTC 3';  
    Blockly.Firebird.definitions_['buzz_config_function']= 'void buzzer_pin_config (void)\n{\n\tDDRC = DDRC | 0x08;   //Setting PORTC pin 3 (where buzzer is connected) as output\n\tPORTC = PORTC & 0xF7;   //Setting PORTC pin 3 logic low to turnoff buzzer\n}\n';
    
    code = 'buzzer_pin_config();\n';
      break;
      case 'sw':
    Blockly.Firebird.interfacings_['switch_interfacing'] = '\nSwitch connections:\n\tInterrupt switch: PORTE 7 (INT7)';
    Blockly.Firebird.definitions_['sw_config_function']= 'void switch_config (void)\n{\n\tDDRE = DDRE & 0x7F; // PORTE 7 pin set as input\n\tPORTE = PORTE | 0x80; // PORTE7 internal pull up enabled \n}\n';
    
    code = 'switch_config();\n';
      break;
      case 'LED':
    Blockly.Firebird.interfacings_['bargraph_LED_interfacing'] = '\nBargraph LED connections:\n\tLED bargraph: PORTJ 7 to PORTJ 0';
    Blockly.Firebird.definitions_['LED_function']= 'void bar_graph_LED_config (void)\n{\n\tDDRJ = 0xFF;  //PORT J is configured as output\n\tPORTJ = 0x00; //Output is set to 0\n}\n';
    
    code = 'bar_graph_LED_config();\n';
      break;
      case 'LCD':
    Blockly.Firebird.interfacings_['lcd_interfacing'] = '\nLCD Connections:\n\tLCD     Microcontroller Pins\n\tRS  --> PC0\n\tRW  --> PC1\n\tEN  --> PC2\n\tDB7 --> PC7\n\tDB6 --> PC6\n\tDB5 --> PC5\n\tDB4 --> PC4\n\t\n';
    Blockly.Firebird.definitions_['LCD_function']= 'void LCD_config (void)\n{\n\tDDRC = DDRC | 0xF7; //all the LCD pins direction set as output\n\tPORTC = PORTC & 0x80; // all the LCD pins are set to logic 0 except PORTC 7\n}\n';
    
    code = 'LCD_config();\n';
      break;
      case 'sen':
    Blockly.Firebird.interfacings_['White_line_sensor_function']='\nWhite line sensor Connections:\n\tADC ch\t\tPort\t\tSensor\n\t0\t\tPORTF 1\t\tLeft\n\t1\t\tPORTF 2\t\tMiddle\n\t2\t\tPORTF 3\t\tRight\n';
    Blockly.Firebird.interfacings_['Sharp_sensor_function']='\nSharp sensor Connections:\n\tADC ch\t\tPort\t\tSensor\n\t9\t\tPORTK 1\t\tLeft\n\t10\t\tPORTK 2\t\tLeft Diagonal\n\t11\t\tPORTK 3\t\tMiddle\n\t12\t\tPORTK 4\t\tRight Diagonal\n\t13\t\tPORTK 5\t\tRight\n';
    Blockly.Firebird.interfacings_['IR_sensor_function']='\nIR Proximity sensor Connections:\n\tADC ch\t\tPort\t\tSensor\n\t4\t\tPORTF 4\t\tLeft\n\t5\t\tPORTF 5\t\tFront Left\n\t6\t\tPORTF 6\t\tMiddle\n\t7\t\tPORTF 7\t\tFront Right\n\t8\t\tPORTK 0\t\tRight\n\t5\t\tATMEGA 8\tBack Right\n\t6\t\tATMEGA 8\tBack\n\t7\t\tATMEGA 8\tBack Left\n';
    Blockly.Firebird.definitions_['ADC_function']= 'void ADC_config (void)\n{\n\tDDRF = 0x00; //set PORTF direction as input\n\tPORTF = 0x00; //set PORTF pins floating\n\tDDRK = 0x00; //set PORTK direction as input\n\tPORTK = 0x00; //set PORTK pins floating\n}\n';
    code = 'ADC_config();\n';
      break;
      case 'DC':
    Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
    Blockly.Firebird.definitions_['motor_function']= 'void motion_config (void)\n{\n\tDDRA = DDRA | 0x0F; //set direction of the PORTA 3 to PORTA 0 pins as output\n\tPORTA = PORTA & 0xF0; // set initial value of the PORTA 3 to PORTA 0 pins to logic 0\n\tDDRL = DDRL | 0x18;   //Setting PL3 and PL4 pins as output for PWM generation\n\tPORTL = PORTL | 0x18; //PL3 and PL4 pins are for velocity control using PWM\n}\n';
    code = 'motion_config();\n';
      break;
      case 'enc':
      Blockly.Firebird.interfacings_['encode_interfacing'] ='\nEncoder Connections:\n\tleft motor position encoder: PE4 (INT4) \n\tright motor position encoder: PE5 (INT5)\n';
      Blockly.Firebird.definitions_['variables_function']= 'unsigned long int ShaftCountLeft = 0; //to keep track of left position encoder\nunsigned long int ShaftCountRight = 0; //to keep track of right position encoder\nunsigned int Degrees; //to accept angle in degrees for turning\n';
      Blockly.Firebird.definitions_['left_enc_function']= 'void left_encoder_pin_config (void)\n{\n\tDDRE  = DDRE & 0xEF;  //Set the direction of the PORTE 4 pin as input\n\tPORTE = PORTE | 0x10; //Enable internal pull-up for PORTE 4 pin\n}\n';
      Blockly.Firebird.definitions_['right_enc_function']= 'void right_encoder_pin_config (void)\n{\n\tDDRE  = DDRE & 0xDF;  //Set the direction of the PORTE 4 pin as input\n\tPORTE = PORTE | 0x20; //Enable internal pull-up for PORTE 4 pin\n}\n';
      Blockly.Firebird.definitions_['left_int_function']= 'void left_position_encoder_interrupt_init (void)\n{\n\tcli(); //Clears the global interrupt\n\tEICRB = EICRB | 0x02; // INT4 is set to trigger with falling edge\n\tEIMSK = EIMSK | 0x10; // Enable Interrupt INT4 for left position encoder\n\tsei();   // Enables the global interrupt \n}\n';
      Blockly.Firebird.definitions_['right_int_function']= 'void right_position_encoder_interrupt_init (void)\n{\n\tcli(); //Clears the global interrupt\n\tEICRB = EICRB | 0x08; // INT5 is set to trigger with falling edge\n\tEIMSK = EIMSK | 0x20; // Enable Interrupt INT5 for right position encoder\n\tsei();   // Enables the global interrupt \n}\n';
    Blockly.Firebird.definitions_['enc_function']= 'void init_encoder_devices (void)\n{\n\tleft_encoder_pin_config();\n\tright_encoder_pin_config();\n\tleft_position_encoder_interrupt_init();\n\tright_position_encoder_interrupt_init();\n}\n';
    code = 'init_encoder_devices();\n';
      break;
      case 'PWM':
    Blockly.Firebird.definitions_['PWM_function']= '// Timer 5 initialized in PWM mode for velocity control\n// Prescale:256\n// PWM 8bit fast, TOP=0x00FF\n// Timer Frequency:225.000Hz\nvoid timer5_init (void)\n{\n\tTCCR5B = 0x00;  //Stop\n\tTCNT5H = 0xFF;  //Counter higher 8-bit value to which OCR5xH value is compared with\n\tTCNT5L = 0x01;  //Counter lower 8-bit value to which OCR5xH value is compared with\n\tOCR5AH = 0x00;  //Output compare register high value for Left Motor\n\tOCR5AL = 0xFF;  //Output compare register low value for Left Motor\n\tOCR5BH = 0x00;  //Output compare register high value for Right Motor\n\tOCR5BL = 0xFF;  //Output compare register low value for Right Motor\n\tOCR5CH = 0x00;  //Output compare register high value for Motor C1\n\tOCR5CL = 0xFF;  //Output compare register low value for Motor C1\n\tTCCR5A = 0xA9;  /*{COM5A1=1, COM5A0=0; COM5B1=1, COM5B0=0; COM5C1=1 COM5C0=0}For Overriding normal port functionality to OCRnA outputs.{WGM51=0, WGM50=1} Along With WGM52 in TCCR5B for Selecting FAST PWM 8-bit Mode*/\n\tTCCR5B = 0x0B;  //WGM12=1; CS12=0, CS11=1, CS10=1 (Prescaler=64)\n}\n';
     Blockly.Firebird.definitions_['PWM_in_function']= 'void init_PWM(void)\n{\n\ttimer5_init();\n}\n';
    code = 'init_PWM();\n';
      break;
   

  }
  // -4.abs() returns -4 in Firebird due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  //var order = code < 0 ?
     // Blockly.Firebird.ORDER_UNARY_PREFIX : Blockly.Firebird.ORDER_ATOMIC;
   return [code, Blockly.Firebird.ORDER_ATOMIC];
};
Blockly.Firebird['set_item'] = function(block) {
  // Variable getter.
  var argument = block.getFieldValue('specifier');
 var argument0 = block.getFieldValue('polarity');
  var argument1 = block.getFieldValue('type');
  var argument2= block.getFieldValue('NAME');
  var argument3 = block.getFieldValue('size');
  if(argument == 'none'){
    argument='';
  }else{
    argument += ' ';
  }
  if(argument3 == 'none'){
    argument3='';
  }else{
    argument3 += ' ';
  }
  if(argument0 == 'signed'){
    argument0 = '';
  }else{
    argument0 += ' ';
  }

   var arg =Blockly.Firebird.valueToCode(block, 'input', Blockly.Firebird.ORDER_NONE) || 0;
   if(!arg){
    arg = '';
   }else{
    arg = ' = ' + arg;
   }
   var code= argument+ argument0+ argument3 + argument1 + ' ' + argument2 + arg + ';' +'\n';
   return code;
};

Blockly.Firebird['register'] = function(block) {
  var arg0=block.getFieldValue('register');
  var arg1=block.getFieldValue('set/reset'); 
  var arg2=Blockly.Firebird.valueToCode(block, 'regex', Blockly.Firebird.ORDER_MULTIPLICATIVE);


  if(arg1=='set'){
    arg1='|';
  }
  else if(arg1 == 'none'){
    return arg0+' = '+ arg2+';';
  }
  else{
    arg1='&';
  }
  var code=arg0 + ' = ' + arg0 + ' ' + arg1 + ' ' + arg2 + ';'+'\n';
   return code;
 };

 Blockly.Firebird['call_function'] = function(block) {
  var funcName = block.getFieldValue('NAME');
    
    var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Firebird.valueToCode(block, 'ARG' + x,
        Blockly.Firebird.ORDER_NONE) || 'null';
    args[x] =block.arguments_[x];
    
  }
  var code = funcName + '(' + args.join(', ') + ')'
      + ';' + '\n';
  //code = Blockly.Firebird.scrub_(block, code);
  
  return code;
   };
 Blockly.Firebird['call_function_with_return'] = function(block) {
  var funcName = block.getFieldValue('NAME');
    
    var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Firebird.valueToCode(block, 'ARG' + x,
        Blockly.Firebird.ORDER_NONE) || 'null';
    args[x] =block.arguments_[x];
    
  }
  var code = funcName + '(' + args.join(', ') + ')';
  //code = Blockly.Firebird.scrub_(block, code);
  
  return code;
   };
    
    Blockly.Firebird['procedures_defnoreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Firebird.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Firebird.statementToCode(block, 'STACK');
  if (Blockly.Firebird.STATEMENT_PREFIX) {
    branch = Blockly.Firebird.prefixLines(
        Blockly.Firebird.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Firebird.INDENT) + branch;
  }
  if (Blockly.Firebird.INFINITE_LOOP_TRAP) {
    branch = Blockly.Firebird.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Firebird.valueToCode(block, 'RETURN',
      Blockly.Firebird.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var returnType = returnValue ? 'dynamic' : 'void';
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = block.arguments2_[x].substr(0,block.arguments2_[x].lastIndexOf(' '))+ ' ' +Blockly.Firebird.variableDB_.getName(block.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '\n}';
  code = Blockly.Firebird.scrub_(block, code);
  
  return code;
};


 Blockly.Firebird['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Firebird.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Firebird.valueToCode(block, 'ARG' + x,
        Blockly.Firebird.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};
Blockly.Firebird['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Firebird.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var returnType=block.getFieldValue('types');
  var branch = Blockly.Firebird.statementToCode(block, 'STACK');
  if (Blockly.Firebird.STATEMENT_PREFIX) {
    branch = Blockly.Firebird.prefixLines(
        Blockly.Firebird.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Firebird.INDENT) + branch;
  }
  if (Blockly.Firebird.INFINITE_LOOP_TRAP) {
    branch = Blockly.Firebird.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Firebird.valueToCode(block, 'RETURN',
      Blockly.Firebird.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  //var returnType = returnValue ? 'dynamic' : 'void';
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = block.arguments2_[x].substr(0,block.arguments2_[x].lastIndexOf(' '))+ " " +block.arguments_[x];
        
  }
  var code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Firebird.scrub_(block, code);
  
  return code;
};
Blockly.Firebird['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Firebird.variableDB_.getName(block.getFieldValue('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Firebird.valueToCode(block, 'ARG' + x,
        Blockly.Firebird.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['return'] = function(block){
  var retval = Blockly.Firebird.valueToCode(block,"RETURN",
      Blockly.Firebird.ORDER_ATOMIC)|| '0';

  return "return " + retval + ";";
};

Blockly.Firebird['Initialise'] = function(block){
  var retval = Blockly.Firebird.valueToCode(block,"Initialise",
      Blockly.Firebird.ORDER_ATOMIC)|| '0';

  return retval;
};


Blockly.Firebird['hex']  = function(block){
  var value = block.getFieldValue("HEX");
  if(!(value.length ==4 && value.substr(0,2) == '0x' && value.substr(2,2).match('^[0-9A-F][0-9A-F]'))){
    alert('give hex value');
  }
  return [value, Blockly.Firebird.ORDER_MULTIPLICATIVE];
};

Blockly.Firebird['incl_ude'] = function(block) {
  var arg =block.getFieldValue('header file');
  Blockly.Firebird.definitions_['include'] = "#include\""+arg+"\""+"\n";
  return '';
};
//Blockly.Firebird[''] = function(block) 

Blockly.Firebird['define'] = function(block) {
  var arg0=block.getFieldValue('name');
  var arg1=block.getFieldValue('value');
  if(arg0 == 'F_CPU'){
    Blockly.Firebird.definitions_['defineFCPU'] = "#define "+arg0+" "+arg1+ "\n";
    return '';
  }
  var code ="#define "+arg0+" "+arg1+ "\n";
  return code;
};

