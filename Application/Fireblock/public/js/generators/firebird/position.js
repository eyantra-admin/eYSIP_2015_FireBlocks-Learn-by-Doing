
'use strict';		
goog.provide('Blockly.Firebird.position');

goog.require('Blockly.Firebird');


Blockly.Firebird['position_motion'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('forward');
  var code;
  var arg;
  
      arg = Blockly.Firebird.valueToCode(block, 'motion',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;      // removing upper nibbel as it is not needed\n\tPortARestore = PORTA;       // reading the PORTAs original status\n\tPortARestore &= 0xF0;       // setting lower direction nibbel to 0\n\tPortARestore |= Direction;  // adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;       // setting the command to the port\n}\n';
  Blockly.Firebird.definitions_['linear_distance_function']= 'void linear_distance_mm(unsigned int DistanceInMM)\n{\n\tfloat ReqdShaftCount = 0;\n\tunsigned long int ReqdShaftCountInt = 0;\n\tReqdShaftCount = DistanceInMM / 5.338; // division by resolution to get shaft count\n\tReqdShaftCountInt = (unsigned long int) ReqdShaftCount;\n\tShaftCountRight = 0;\n\twhile(1)\n\t{\n\t\tif(ShaftCountRight > ReqdShaftCountInt)\n\t\t{\n\t\t\tbreak;\n\t\t}\n\t}\n\tstop(); //Stop robot\n}\n';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'fwd':
      code = 'forward_mm(' + arg + ');\n';
      Blockly.Firebird.definitions_['forward_function']= 'void forward(void)\n{\n\tmotion_set(0x06);\n}\n';
      Blockly.Firebird.definitions_['forward_mm_function']= 'void forward_mm(unsigned int DistanceInMM)\n{\n\tforward();\n\tlinear_distance_mm(DistanceInMM);\n}\n';
      break;
    case 'back':
      code = 'back_mm(' + arg + ');\n';
      Blockly.Firebird.definitions_['back_function']= 'void back(void)\n{\n\tmotion_set(0x09);\n}\n';
      Blockly.Firebird.definitions_['back_mm_function']= 'void back_mm(unsigned int DistanceInMM)\n{\n\tback();\n\tlinear_distance_mm(DistanceInMM);\n}\n';
      break;
   
  }
    return (code);
};

Blockly.Firebird['position_turn'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('forward');
  var code;
  var arg;
  
      arg = Blockly.Firebird.valueToCode(block, 'motion',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;      // removing upper nibbel as it is not needed\n\tPortARestore = PORTA;       // reading the PORTAs original status\n\tPortARestore &= 0xF0;       // setting lower direction nibbel to 0\n\tPortARestore |= Direction;  // adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;       // setting the command to the port\n}\n';
  Blockly.Firebird.definitions_['angle_rotate_function']= 'void angle_rotate(unsigned int Degrees)\n{\n\tfloat ReqdShaftCount = 0;\n\tunsigned long int ReqdShaftCountInt = 0;\n\tReqdShaftCount = (float) Degrees/ 4.090; // division by resolution to get shaft count\n\tReqdShaftCountInt = (unsigned int) ReqdShaftCount;\n\tShaftCountRight = 0;\n\tShaftCountLeft = 0;\n\twhile (1)\n\t{\n\t\tif((ShaftCountRight >= ReqdShaftCountInt) | (ShaftCountLeft >= ReqdShaftCountInt))\n\t\t\tbreak;\n\t}\n\tstop(); //Stop robot\n}\n';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'left':
      code = 'left_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['left_function']= 'void left (void)\n{\n\tmotion_set(0x05);\n}\n';
      Blockly.Firebird.definitions_['left_degrees_function']= 'void left_degrees(unsigned int Degrees)\n{\n// 88 pulses for 360 degrees rotation 4.090 degrees per count\n\tleft(); //Turn left\n\tangle_rotate(Degrees);\n}\n';
      break;
    case 'right':
      code = 'right_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['right_function']= 'void right (void)\n{\n\tmotion_set(0x0A);\n}\n';
      Blockly.Firebird.definitions_['right_degrees_function']= 'void right_degrees(unsigned int Degrees)\n{\n// 88 pulses for 360 degrees rotation 4.090 degrees per count\n\tright(); //Turn right\n\tangle_rotate(Degrees);\n}\n';
      break;
   
  }
    return (code);
};

Blockly.Firebird['position_turn_soft'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('forward');
  var code;
  var arg;
  
      arg = Blockly.Firebird.valueToCode(block, 'soft_turn',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;      // removing upper nibbel as it is not needed\n\tPortARestore = PORTA;       // reading the PORTAs original status\n\tPortARestore &= 0xF0;       // setting lower direction nibbel to 0\n\tPortARestore |= Direction;  // adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;       // setting the command to the port\n}\n';
  Blockly.Firebird.definitions_['angle_rotate_function']= 'void angle_rotate(unsigned int Degrees)\n{\n\tfloat ReqdShaftCount = 0;\n\tunsigned long int ReqdShaftCountInt = 0;\n\tReqdShaftCount = (float) Degrees/ 4.090; // division by resolution to get shaft count\n\tReqdShaftCountInt = (unsigned int) ReqdShaftCount;\n\tShaftCountRight = 0;\n\tShaftCountLeft = 0;\n\twhile (1)\n\t{\n\t\tif((ShaftCountRight >= ReqdShaftCountInt) | (ShaftCountLeft >= ReqdShaftCountInt))\n\t\t\tbreak;\n\t}\n\tstop(); //Stop robot\n}\n';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'left':
      code = 'soft_left_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['soft_left_function']= 'void soft_left (void)\n{\n\tmotion_set(0x04);\n}\n';
      Blockly.Firebird.definitions_['soft_left_degrees_function']= 'void soft_left_degrees(unsigned int Degrees)\n{\n// 176 pulses for 360 degrees rotation 2.045 degrees per count\n\tsoft_left(); //Turn soft left\n\tDegrees=Degrees*2;\n\tangle_rotate(Degrees);\n}\n';
      break;
    case 'right':
      code = 'soft_right_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['soft_right_function']= 'void soft_right (void)\n{\n\tmotion_set(0x02);\n}\n';
      Blockly.Firebird.definitions_['soft_right_degrees_function']= 'void soft_right_degrees(unsigned int Degrees)\n{\n// 176 pulses for 360 degrees rotation 2.045 degrees per count\n\tsoft_right(); //Turn soft right\n\tDegrees=Degrees*2;\n\tangle_rotate(Degrees);\n}\n';
      break;
   
  }
    return (code);
};

Blockly.Firebird['position_turn_back'] = function(block) {
  // Math operators with single operand.
  var operator = block.getFieldValue('forward');
  var code;
  var arg;
   Blockly.Firebird.definitions_['include_firebird']= '#include "firebird.h"';
      arg = Blockly.Firebird.valueToCode(block, 'back_turn',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      Blockly.Firebird.definitions_['motionset_function']= 'void motion_set (unsigned char Direction)\n{\n\tunsigned char PortARestore = 0;\n\tDirection &= 0x0F;      // removing upper nibbel as it is not needed\n\tPortARestore = PORTA;       // reading the PORTAs original status\n\tPortARestore &= 0xF0;       // setting lower direction nibbel to 0\n\tPortARestore |= Direction;  // adding lower nibbel for direction command and restoring the PORTA status\n\tPORTA = PortARestore;       // setting the command to the port\n}\n';
  Blockly.Firebird.definitions_['angle_rotate_function']= 'void angle_rotate(unsigned int Degrees)\n{\n\tfloat ReqdShaftCount = 0;\n\tunsigned long int ReqdShaftCountInt = 0;\n\tReqdShaftCount = (float) Degrees/ 4.090; // division by resolution to get shaft count\n\tReqdShaftCountInt = (unsigned int) ReqdShaftCount;\n\tShaftCountRight = 0;\n\tShaftCountLeft = 0;\n\twhile (1)\n\t{\n\t\tif((ShaftCountRight >= ReqdShaftCountInt) | (ShaftCountLeft >= ReqdShaftCountInt))\n\t\t\tbreak;\n\t}\n\tstop(); //Stop robot\n}\n';
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'left':
      code = 'soft_left_2_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['soft_left_2_function']= 'void soft_left_2 (void)\n{\n\tmotion_set(0x01);\n}\n';
      Blockly.Firebird.definitions_['soft_left_2_degrees_function']= 'void soft_left_2_degrees(unsigned int Degrees)\n{\n// 176 pulses for 360 degrees rotation 2.045 degrees per count\n\tsoft_left_2(); //Turn back left\n\tDegrees=Degrees*2;\n\tangle_rotate(Degrees);\n}\n';
      break;
    case 'right':
      code = 'soft_right_2_degrees(' + arg + ');\n';
      Blockly.Firebird.definitions_['soft_right_2_function']= 'void soft_right_2 (void)\n{\n\tmotion_set(0x08);\n}\n';
      Blockly.Firebird.definitions_['soft_right_2_degrees_function']= 'void soft_right_2_degrees(unsigned int Degrees)\n{\n// 176 pulses for 360 degrees rotation 2.045 degrees per count\n\tsoft_right_2(); //Turn back right\n\tDegrees=Degrees*2;\n\tangle_rotate(Degrees);\n}\n';
      break;
   
  }
 
    return (code);
};
