

	
goog.provide('Blockly.Firebird.motion');

goog.require('Blockly.Firebird');





Blockly.Firebird['motion'] = function(block) {
  var operator = block.getFieldValue('motion');
  var code;
  Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
  Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;\t\t// removing upper nibbel as it is not needed\n\tPortARestore = PORTA;\t\t// reading the PORTAs original status\n\tPortARestore &= 0xF0;\t\t// setting lower direction nibbel to 0\n\tPortARestore |= Direction;\t// adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;\t\t// setting the command to the port\n}\n';
   switch (operator) {
    case 'forward':
      code = 'forward();\n';
      Blockly.Firebird.definitions_['forward_function']= 'void forward(void)\n{\n\tmotion_set(0x06); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0110 to move forward \n}\n';
      break;
    case 'back':
      code = 'back();\n';
      Blockly.Firebird.definitions_['back_function']= 'void back(void)\n{\n\tmotion_set(0x09); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=1001 to move back \n}\n';
      break;
    case 'stop':
      code = 'stop();\n';
      Blockly.Firebird.definitions_['stop_function']= 'void stop(void)\n{\n\tmotion_set(0x00); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0000 to stop\n}\n';
      break;
  }
  
  return (code);
};

Blockly.Firebird['turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
    Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
    Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;\t\t// removing upper nibbel as it is not needed\n\tPortARestore = PORTA;\t\t// reading the PORTAs original status\n\tPortARestore &= 0xF0;\t\t// setting lower direction nibbel to 0\n\tPortARestore |= Direction;\t// adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;\t\t// setting the command to the port\n}\n';
   switch (operator) {
    case 'right':
      code = 'right();\n';
      Blockly.Firebird.definitions_['right_function']= 'void right (void)\n{\n\tmotion_set(0x0A); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=1010 to turn right \n}\n';
      break;
    case 'left':
      code = 'left();\n';
      Blockly.Firebird.definitions_['left_function']= 'void left (void)\n{\n\tmotion_set(0x05); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0101 to turn left\n}\n';
      break;
    
  }
  
  return (code);
};

Blockly.Firebird['soft_turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
    Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
    Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;\t\t// removing upper nibbel as it is not needed\n\tPortARestore = PORTA;\t\t// reading the PORTAs original status\n\tPortARestore &= 0xF0;\t\t// setting lower direction nibbel to 0\n\tPortARestore |= Direction;\t// adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;\t\t// setting the command to the port\n}\n';
   switch (operator) {
    case 'soft_right':
      code = 'soft_right();\n';
      Blockly.Firebird.definitions_['soft_right_function']= 'void soft_right (void)\n{\n\tmotion_set(0x02); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0010 to turn soft right\n}\n';
      break;
    case 'soft_left':
      code = 'soft_left();\n';
      Blockly.Firebird.definitions_['soft_left_function']= 'void soft_left (void)\n{\n\tmotion_set(0x04); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0100 to turn soft left \n}\n';
      break;
    
  }
  return (code);
};

Blockly.Firebird['back_turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
    Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
    Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;\t\t// removing upper nibbel as it is not needed\n\tPortARestore = PORTA;\t\t// reading the PORTAs original status\n\tPortARestore &= 0xF0;\t\t// setting lower direction nibbel to 0\n\tPortARestore |= Direction;\t// adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;\t\t// setting the command to the port\n}\n';
   switch (operator) {
    case 'back_right':
      code = 'soft_right_2();\n';
      Blockly.Firebird.definitions_['soft_right_2_function']= 'void soft_right_2 (void)\n{\n\tmotion_set(0x08); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=1000 to turn soft right\n}\n';
      break;
    case 'back_left':
      code = 'soft_left_2();\n';
      Blockly.Firebird.definitions_['soft_left_2_function']= 'void soft_left_2 (void)\n{\n\tmotion_set(0x01); \t// Four pins used to control the direction of motor are configured as PA(0)PA(1)PA(2)PA(3)=0001 to turn soft left\n}\n';
      break;
    
  }
  
  return (code);
};


Blockly.Firebird['velocity'] = function(block) {
  var left = Blockly.Firebird.valueToCode(block,"left",
      Blockly.Firebird.ORDER_ATOMIC)|| '255';
  var right = Blockly.Firebird.valueToCode(block,"right",
      Blockly.Firebird.ORDER_ATOMIC)|| '255';
  Blockly.Firebird.interfacings_['motion_interfacing'] = '\nMotor Connections\n\tL-1 --> PA0\n\tL-2 --> PA1\n\tR-1 --> PA2\n\tR-2 --> PA3\n\tE-L --> PL3(OC5A)\n\tE-R --> PL4(OC5B)\n';
  Blockly.Firebird.definitions_['velocity_function']= 'void velocity (unsigned char left_motor, unsigned char right_motor)\n{\n\tOCR5AL = (unsigned char)left_motor;\n\tOCR5BL = (unsigned char)right_motor;\n}\n';
  return "velocity("+left+","+right+");";
};
