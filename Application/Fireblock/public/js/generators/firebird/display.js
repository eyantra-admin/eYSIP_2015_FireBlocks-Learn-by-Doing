'use strict';		
goog.provide('Blockly.Firebird.display');

goog.require('Blockly.Firebird');

Blockly.Firebird['display_init'] = function(block) {
  Blockly.Firebird.interfacings_['lcd_interfacing'] = '\nLCD Connections:\n\tLCD     Microcontroller Pins\n\tRS  --> PC0\n\tRW  --> PC1\n\tEN  --> PC2\n\tDB7 --> PC7\n\tDB6 --> PC6\n\tDB5 --> PC5\n\tDB4 --> PC4\n\t\n';
  var code= 'lcd_init();\n lcd_set_4_bit();\n';
  Blockly.Firebird.definitions_['lcd_initialize_function']='//Initialization\n#define RS 0\n#define RW 1\n#define EN 2\n#define lcd_port PORTC\n#define sbit(reg,bit)  reg |= (1<<bit) // Macro defined for Setting a bit of any register\n#define cbit(reg,bit) reg &= ~(1<<bit) // Macro defined for Clearing a bit of any register\n' ; 
  Blockly.Firebird.definitions_['lcd_wr_command_function']='//Function to Write Command on LCD \n void lcd_wr_command(unsigned char cmd) \n { \n\t unsigned char temp; \n\ttemp = cmd; \n\ttemp = (temp & 0xF0); \t\t//to fetch upper nibble  \n\tlcd_port &= 0x0F; \t\t//to fetch upper nibble \n\tlcd_port |= temp; \t\t//fetched upper nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\tcmd = cmd & 0x0F; \t\t//to fetch lower nibble \n\tcmd = cmd<<4; \t\t\t//shift bits \n\tlcd_port &= 0x0F; \t\t//to fetch lower nibble \n\tlcd_port |= cmd; \t\t//fetched lower nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n' ; 
  Blockly.Firebird.definitions_['lcd_init_function']='//Function to Initialize LCD \nvoid lcd_init() \n {\n\t_delay_ms(1);\n\tlcd_wr_command(0x28); \t\t// LCD 4-bit mode and 2 lines \n\tlcd_wr_command(0x01); \t\t// Clear display \n\tlcd_wr_command(0x06); \t\t// Entry mode \n\tlcd_wr_command(0x0E); \t\t// Turn display ON and Curson ON \n\tlcd_wr_command(0x80); \t\t// Address for line 1 \n }\n' ; 
  Blockly.Firebird.definitions_['lcd_set_4bit_function']='//Function to Reset LCD \nvoid lcd_set_4bit() \n {\n\t_delay_ms(1); \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tlcd_port = 0x30; \t\t//Sending 3 \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\t_delay_ms(1); \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tlcd_port = 0x30; \t\t//Sending 3 \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\t_delay_ms(1); \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tlcd_port = 0x30; \t\t//Sending 3 \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\t_delay_ms(1); \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tlcd_port = 0x20; \t\t//Sending 2 to initialise LCD 4-bit mode \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\n\t_delay_ms(1); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n' ; 
  return (code);
};


Blockly.Firebird['display_channel'] = function(block) {

  // Math operators with single operand.
  
  var code;
  
  
 // alert(arg);
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
      
      Blockly.Firebird.definitions_['lcd_initialize_function']='//Initialization\n#define RS 0\n#define RW 1\n#define EN 2\n#define lcd_port PORTC\n#define sbit(reg,bit)  reg |= (1<<bit) // Macro defined for Setting a bit of any register\n#define cbit(reg,bit) reg &= ~(1<<bit) // Macro defined for Clearing a bit of any register\n' ; 
      Blockly.Firebird.definitions_['lcd_wr_command_function']='//Function to Write Command on LCD \n void lcd_wr_command(unsigned char cmd) \n { \n\t unsigned char temp; \n\ttemp = cmd; \n\ttemp = (temp & 0xF0); \t\t//to fetch upper nibble  \n\tlcd_port &= 0x0F; \t\t//to fetch upper nibble \n\tlcd_port |= temp; \t\t//fetched upper nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\tcmd = cmd & 0x0F; \t\t//to fetch lower nibble \n\tcmd = cmd<<4; \t\t\t//shift bits \n\tlcd_port &= 0x0F; \t\t//to fetch lower nibble \n\tlcd_port |= cmd; \t\t//fetched lower nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n' ; 
      Blockly.Firebird.definitions_['lcd_home']='//Function to bring cursor at home position\nvoid lcd_home()\n {\n\tlcd_wr_command(0x80);\n }\n' ;
      Blockly.Firebird.definitions_['lcd_cursor']='//Position the LCD cursor at "row", "column" \nvoid lcd_cursor (char row, char column)\n {\n\tswitch (row)\n\t{\n\t\tcase 1: lcd_wr_command (0x80 + column - 1); break; //display 1st row position\n\t\tcase 2: lcd_wr_command (0xc0 + column - 1); break; //display 2nd row position\n\t\tdefault: break;\n\t}\n }\n\n'; 
      Blockly.Firebird.definitions_['lcd_char']='//Function to Write Data on LCD \n void lcd_wr_char(char letter) \n { \n\tchar temp; \n\ttemp = letter; \n\ttemp = (temp & 0xF0); \t\t//to fetch upper nibble  \n\tlcd_port &= 0x0F; \t\t//to fetch upper nibble \n\tlcd_port |= temp; \t\t//fetched upper nibble \n\tsbit(lcd_port,RS); \t\t//RS=1 --- Data Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\tletter = letter & 0x0F; \t//to fetch lower nibble \n\tletter = letter<<4; \t\t//shift bits \n\tlcd_port &= 0x0F; \t\t//to fetch lower nibble \n\tlcd_port |= letter; \t\t//fetched lower nibble \n\tsbit(lcd_port,RS); \t\t//RS=1 --- Data Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n ';
      Blockly.Firebird.definitions_['lcd_print_function']='//Function To Print Any input value upto the desired digit on LCD \nvoid lcd_print (char row, char coloumn, unsigned int value, int digits) \n { \n\tunsigned int unit, tens, hundred, thousand, million;\n\tunsigned char flag=0; \n\tif(row==0||coloumn==0) \n\t\tlcd_home(); \t\t\t\t//position the cursor at address 0 \n\telse \n\t\tlcd_cursor(row,coloumn); \t\t//position the cursor at specified row and coloumn \n\tif(digits==5 || flag==1) \n\t{ \n\t\tmillion=value/10000+48; \n\t\tlcd_wr_char(million);\n\t\tflag=1; \n\t} \n\tif(digits==4 || flag==1) \n\t{ \n\t\ttemp = value/1000; \n\t\tthousand = temp%10 + 48; \n\t\tlcd_wr_char(thousand); \n\t\tflag=1; \n\t} \n\tif(digits==3 || flag==1) \n\t{ \n\t\ttemp = value/100; \n\t\thundred = temp%10 + 48; \n\t\tlcd_wr_char(hundred); \n\t\tflag=1; \n\t} \n\tif(digits==2 || flag==1) \n\t{ \n\t\ttemp = value/10; \n\t\ttens = temp%10 + 48; \n\t\tlcd_wr_char(tens); \n\t\tflag=1; \n\t} \n\tif(digits==1 || flag==1) \n\t{ \n\t\tunit = value%10 + 48; \n\t\tlcd_wr_char(unit); \n\t} \n\tif(digits>5) \n\t{ \n\t\tlcd_wr_char(\'E\'); \n\t} \n }' ;
      var arg = Blockly.Firebird.valueToCode(block, 'channel',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      var row = Blockly.Firebird.valueToCode(block, 'row',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      var col = Blockly.Firebird.valueToCode(block, 'column',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
      var digit = block.getFieldValue('digit');
      arg = arg.replace("(","");
      arg = arg.replace(")","");  
      code = 'lcd_print('+ row + ',' + col + ',' + arg +',' + digit + ');\n';
      Blockly.Firebird.interfacings_['lcd_interfacing'] = '\nLCD Connections:\n\tLCD     Microcontroller Pins\n\tRS  --> PC0\n\tRW  --> PC1\n\tEN  --> PC2\n\tDB7 --> PC7\n\tDB6 --> PC6\n\tDB5 --> PC5\n\tDB4 --> PC4\n\t\n';

  
 
  return code;
};

Blockly.Firebird['display_text'] = function(block) {
  // Math operators with single operand.
  var row = Blockly.Firebird.valueToCode(block, 'row',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
  var col = Blockly.Firebird.valueToCode(block, 'column',
        Blockly.Firebird.ORDER_MULTIPLICATIVE) || '0';
  var arg0=block.getFieldValue('text');
  var code = 'lcd_string_disp('+row +','+col+',"' + arg0 + '");\n';
   Blockly.Firebird.interfacings_['lcd_interfacing'] = '\nLCD Connections:\n\tLCD     Microcontroller Pins\n\tRS  --> PC0\n\tRW  --> PC1\n\tEN  --> PC2\n\tDB7 --> PC7\n\tDB6 --> PC6\n\tDB5 --> PC5\n\tDB4 --> PC4\n\t\n';
   Blockly.Firebird.definitions_['lcd_initialize_function']='//Initialization\n#define RS 0\n#define RW 1\n#define EN 2\n#define lcd_port PORTC\n#define sbit(reg,bit)  reg |= (1<<bit) // Macro defined for Setting a bit of any register\n#define cbit(reg,bit) reg &= ~(1<<bit) // Macro defined for Clearing a bit of any register\n' ; 
   Blockly.Firebird.definitions_['lcd_wr_command_function']='//Function to Write Command on LCD \n void lcd_wr_command(unsigned char cmd) \n { \n\t unsigned char temp; \n\ttemp = cmd; \n\ttemp = (temp & 0xF0); \t\t//to fetch upper nibble  \n\tlcd_port &= 0x0F; \t\t//to fetch upper nibble \n\tlcd_port |= temp; \t\t//fetched upper nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\tcmd = cmd & 0x0F; \t\t//to fetch lower nibble \n\tcmd = cmd<<4; \t\t\t//shift bits \n\tlcd_port &= 0x0F; \t\t//to fetch lower nibble \n\tlcd_port |= cmd; \t\t//fetched lower nibble \n\tcbit(lcd_port,RS); \t\t//RS=0 --- Command Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n' ; 
   Blockly.Firebird.definitions_['lcd_home']='//Function to bring cursor at home position\nvoid lcd_home()\n {\n\tlcd_wr_command(0x80);\n }\n' ;
   Blockly.Firebird.definitions_['lcd_cursor']='//Position the LCD cursor at "row", "column" \nvoid lcd_cursor (char row, char column)\n{\n\tswitch (row)\n\t{\n\t\tcase 1: lcd_wr_command (0x80 + column - 1); break; //display 1st row position\n\t\tcase 2: lcd_wr_command (0xc0 + column - 1); break; //display 2nd row position\n\t\tdefault: break;\n\t}\n }\n\n'; 
   Blockly.Firebird.definitions_['lcd_char']='//Function to Write Data on LCD \n void lcd_wr_char(char letter) \n { \n\tchar temp; \n\ttemp = letter; \n\ttemp = (temp & 0xF0); \t\t//to fetch upper nibble  \n\tlcd_port &= 0x0F; \t\t//to fetch upper nibble \n\tlcd_port |= temp; \t\t//fetched upper nibble \n\tsbit(lcd_port,RS); \t\t//RS=1 --- Data Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n\n\tletter = letter & 0x0F; \t//to fetch lower nibble \n\tletter = letter<<4; \t\t//shift bits \n\tlcd_port &= 0x0F; \t\t//to fetch lower nibble \n\tlcd_port |= letter; \t\t//fetched lower nibble \n\tsbit(lcd_port,RS); \t\t//RS=1 --- Data Input \n\tcbit(lcd_port,RW); \t\t//RW=0 --- Writing to LCD \n\tsbit(lcd_port,EN); \t\t//Set Enable Pin \n\t_delay_ms(5); \t\t\t//Delay \n\tcbit(lcd_port,EN); \t\t//Clear Enable Pin \n }\n ';
   Blockly.Firebird.definitions_['lcd_string_disp']='//Function to Print String on LCD \nvoid lcd_string_disp(char row,char column, char *str)\n{ \n\tif(row==0||coloumn==0) \n\t\tlcd_home(); \t\t\t\t//position the cursor at address 0 \n\telse \n\t\tlcd_cursor(row,coloumn); \t\t//position the cursor at specified row and coloumn \n\twhile(*str != \'\\0\') \t\t\t\t//while the end of string \n\t{ \n\t\tlcd_wr_char(*str); \t\t\t//print character one by one \n\t\tstr++; \n\t}\n }\n'; 
  return code;
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