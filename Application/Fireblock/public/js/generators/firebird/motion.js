

	
goog.provide('Blockly.Firebird.motion');

goog.require('Blockly.Firebird');





Blockly.Firebird['motion'] = function(block) {
  var operator = block.getFieldValue('motion');
  var code;
   switch (operator) {
    case 'forward':
      code = 'forward();\n';
      break;
    case 'back':
      code = 'back();\n';
      break;
    case 'stop':
      code = 'stop();\n';
      break;
  }
  return (code);
};

Blockly.Firebird['turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
   switch (operator) {
    case 'right':
      code = 'right();\n';
      break;
    case 'left':
      code = 'left();\n';
      break;
    
  }
  return (code);
};

Blockly.Firebird['soft_turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
   switch (operator) {
    case 'soft_right':
      code = 'soft_right();\n';
      break;
    case 'soft_left':
      code = 'soft_left();\n';
      break;
    
  }
  return (code);
};

Blockly.Firebird['back_turn'] = function(block) {
  var operator = block.getFieldValue('turn');
  var code;
   switch (operator) {
    case 'back_right':
      code = 'soft_right_2();\n';
      break;
    case 'back_left':
      code = 'soft_left_2();\n';
      break;
    
  }
  return (code);
};