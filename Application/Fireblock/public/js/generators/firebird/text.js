/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2014 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Firebird for text blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Firebird.texts');

goog.require('Blockly.Firebird');


Blockly.Firebird.addReservedWords('Html,Math');

Blockly.Firebird['text'] = function(block) {
  // Text value.
  var code = Blockly.Firebird.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Firebird.ORDER_ATOMIC];
};

Blockly.Firebird['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  var code;
  if (block.itemCount_ == 0) {
    return ['\'\'', Blockly.Firebird.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Firebird.valueToCode(block, 'ADD0',
        Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0 + '.toString()';
    return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
  } else {
    code = new Array(block.itemCount_);
    for (var n = 0; n < block.itemCount_; n++) {
      code[n] = Blockly.Firebird.valueToCode(block, 'ADD' + n,
          Blockly.Firebird.ORDER_NONE) || '\'\'';
    }
    code = '[' + code.join(',') + '].join()';
    return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
  }
};

Blockly.Firebird['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Firebird.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Firebird.valueToCode(block, 'TEXT',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  return varName + ' = [' + varName + ', ' + argument0 + '].join();\n';
};

Blockly.Firebird['text_length'] = function(block) {
  // String length.
  var argument0 = Blockly.Firebird.valueToCode(block, 'VALUE',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + '.length', Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_isEmpty'] = function(block) {
  // Is the string null?
  var argument0 = Blockly.Firebird.valueToCode(block, 'VALUE',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + '.isEmpty', Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_indexOf'] = function(block) {
  // Search the text for a substring.
  var operator = block.getFieldValue('END') == 'FIRST' ?
      'indexOf' : 'lastIndexOf';
  var argument0 = Blockly.Firebird.valueToCode(block, 'FIND',
      Blockly.Firebird.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Firebird.valueToCode(block, 'VALUE',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_charAt'] = function(block) {
  // Get letter at index.
  // Note: Until January 2013 this block did not have the WHERE input.
  var where = block.getFieldValue('WHERE') || 'FROM_START';
  var at = Blockly.Firebird.valueToCode(block, 'AT',
      Blockly.Firebird.ORDER_NONE) || '1';
  var text = Blockly.Firebird.valueToCode(block, 'VALUE',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  switch (where) {
    case 'FIRST':
      var code = text + '[0]';
      return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
    case 'FROM_START':
      // Blockly uses one-based indicies.
      if (at.match(/^-?\d+$/)) {
        // If the index is a naked number, decrement it right now.
        at = parseInt(at, 10) - 1;
      } else {
        // If the index is dynamic, decrement it in code.
        at += ' - 1';
      }
      var code = text + '[' + at + ']';
      return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
    case 'LAST':
      at = 1;
      // Fall through.
    case 'FROM_END':
      var functionName = Blockly.Firebird.provideFunction_(
          'text_get_from_end',
          [ 'String ' + Blockly.Firebird.FUNCTION_NAME_PLACEHOLDER_ +
              '(String text, num x) {',
            '  return text[text.length - x];',
            '}']);
      code = functionName + '(' + text + ', ' + at + ')';
      return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
    case 'RANDOM':
      Blockly.Firebird.definitions_['import_Firebird_math'] =
          'import \'Firebird:math\' as Math;';
      var functionName = Blockly.Firebird.provideFunction_(
          'text_random_letter',
          [ 'String ' + Blockly.Firebird.FUNCTION_NAME_PLACEHOLDER_ +
              '(String text) {',
            '  int x = new Math.Random().nextInt(text.length);',
            '  return text[x];',
            '}']);
      code = functionName + '(' + text + ')';
      return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
  }
  throw 'Unhandled option (text_charAt).';
};

Blockly.Firebird['text_getSubstring'] = function(block) {
  // Get substring.
  var text = Blockly.Firebird.valueToCode(block, 'STRING',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  var where1 = block.getFieldValue('WHERE1');
  var where2 = block.getFieldValue('WHERE2');
  var at1 = Blockly.Firebird.valueToCode(block, 'AT1',
      Blockly.Firebird.ORDER_NONE) || '1';
  var at2 = Blockly.Firebird.valueToCode(block, 'AT2',
      Blockly.Firebird.ORDER_NONE) || '1';
  if (where1 == 'FIRST' && where2 == 'LAST') {
    var code = text;
  } else {
    var functionName = Blockly.Firebird.provideFunction_(
        'text_get_substring',
        [ 'function ' + Blockly.Firebird.FUNCTION_NAME_PLACEHOLDER_ +
            '(text, where1, at1, where2, at2) {',
          '  function getAt(where, at) {',
          '    if (where == \'FROM_START\') {',
          '      at--;',
          '    } else if (where == \'FROM_END\') {',
          '      at = text.length - at;',
          '    } else if (where == \'FIRST\') {',
          '      at = 0;',
          '    } else if (where == \'LAST\') {',
          '      at = text.length - 1;',
          '    } else {',
          '      throw \'Unhandled option (text_getSubstring).\';',
          '    }',
          '    return at;',
          '  }',
          '  at1 = getAt(where1, at1);',
          '  at2 = getAt(where2, at2) + 1;',
          '  return text.substring(at1, at2);',
          '}']);
    var code = functionName + '(' + text + ', \'' +
        where1 + '\', ' + at1 + ', \'' + where2 + '\', ' + at2 + ')';
  }
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_changeCase'] = function(block) {
  // Change capitalization.
  var OPERATORS = {
    'UPPERCASE': '.toUpperCase()',
    'LOWERCASE': '.toLowerCase()',
    'TITLECASE': null
  };
  var operator = OPERATORS[block.getFieldValue('CASE')];
  var code;
  if (operator) {
    // Upper and lower case are functions built into Firebird.
    var argument0 = Blockly.Firebird.valueToCode(block, 'TEXT',
        Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
    code = argument0 + operator;
  } else {
    // Title case is not a native Firebird function.  Define one.
    var functionName = Blockly.Firebird.provideFunction_(
        'text_toTitleCase',
        [ 'String ' + Blockly.Firebird.FUNCTION_NAME_PLACEHOLDER_ +
            '(String str) {',
          '  RegExp exp = new RegExp(r\'\\b\');',
          '  List<String> list = str.split(exp);',
          '  final title = new StringBuffer();',
          '  for (String part in list) {',
          '    if (part.length > 0) {',
          '      title.write(part[0].toUpperCase());',
          '      if (part.length > 0) {',
          '        title.write(part.substring(1).toLowerCase());',
          '      }',
          '    }',
          '  }',
          '  return title.toString();',
          '}']);
    var argument0 = Blockly.Firebird.valueToCode(block, 'TEXT',
        Blockly.Firebird.ORDER_NONE) || '\'\'';
    code = functionName + '(' + argument0 + ')';
  }
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_trim'] = function(block) {
  // Trim spaces.
  var OPERATORS = {
    'LEFT': '.replaceFirst(new RegExp(r\'^\\s+\'), \'\')',
    'RIGHT': '.replaceFirst(new RegExp(r\'\\s+$\'), \'\')',
    'BOTH': '.trim()'
  };
  var operator = OPERATORS[block.getFieldValue('MODE')];
  var argument0 = Blockly.Firebird.valueToCode(block, 'TEXT',
      Blockly.Firebird.ORDER_UNARY_POSTFIX) || '\'\'';
  return [argument0 + operator, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_print'] = function(block) {
  // Print statement.
  var argument0 = Blockly.Firebird.valueToCode(block, 'TEXT',
      Blockly.Firebird.ORDER_NONE) || '\'\'';
  return 'print(' + argument0 + ');\n';
};

Blockly.Firebird['text_prompt'] = function(block) {
  // Prompt function (internal message).
  Blockly.Firebird.definitions_['import_Firebird_html'] =
      'import \'Firebird:html\' as Html;';
  var msg = Blockly.Firebird.quote_(block.getFieldValue('TEXT'));
  var code = 'Html.window.prompt(' + msg + ', \'\')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    Blockly.Firebird.definitions_['import_Firebird_math'] =
        'import \'Firebird:math\' as Math;';
    code = 'Math.parseDouble(' + code + ')';
  }
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};

Blockly.Firebird['text_prompt_ext'] = function(block) {
  // Prompt function (external message).
  Blockly.Firebird.definitions_['import_Firebird_html'] =
      'import \'Firebird:html\' as Html;';
  var msg = Blockly.Firebird.valueToCode(block, 'TEXT',
      Blockly.Firebird.ORDER_NONE) || '\'\'';
  var code = 'Html.window.prompt(' + msg + ', \'\')';
  var toNumber = block.getFieldValue('TYPE') == 'NUMBER';
  if (toNumber) {
    Blockly.Firebird.definitions_['import_Firebird_math'] =
        'import \'Firebird:math\' as Math;';
    code = 'Math.parseDouble(' + code + ')';
  }
  return [code, Blockly.Firebird.ORDER_UNARY_POSTFIX];
};
