'use strict';

goog.provide('Blockly.Blocks.display');

goog.require('Blockly.Blocks');

Blockly.Blocks['display_init'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendDummyInput()
        .appendField("LCD_init");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['display_cursor'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendValueInput("Cursor")
        .setCheck(["Number", "String"])
        .appendField("cursor position")
        .appendField(new Blockly.FieldDropdown([["Row", "row"], ["Column", "column"]]), "position");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['display_channel'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendValueInput("Channel")
        .setCheck("String")
        .appendField("display value of");
    this.setPreviousStatement(true,"null");
    this.setNextStatement(true,"null");
    this.setTooltip('');
  }
};

Blockly.Blocks['logic_compare1'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(210);
    this.appendValueInput("A")
        .setCheck("null");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["=", "EQ"], ["!=", "NE"], ["<", "LS"], ["<=", "LE"], [">", "GT"], [">=", "GE"]]), "options");
    this.appendValueInput("B")
        .setCheck("null");
    this.setInputsInline(true);
    this.setOutput(true);
    this.setTooltip('');
  }
};