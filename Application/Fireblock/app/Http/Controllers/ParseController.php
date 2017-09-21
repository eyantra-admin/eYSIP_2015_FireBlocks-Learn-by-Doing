<?php namespace App\Http\Controllers;


//use App\Http\Controllers\Log;
use Input;
use Request;
session_start();
ini_set('display_errors', 1); 
error_reporting(E_ALL);

class ParseController extends Controller {

	/*
	|--------------------------------------------------------------------------
	| Welcome Controller
	|--------------------------------------------------------------------------
	|
	| This controller renders the "marketing page" for the application and
	| is configured to only allow guests. Like most of the other sample
	| controllers, you are free to modify or remove it as you desire.
	|
	*/
	public static $definitions = array();
	public static $strings;
	public static $fcpu;
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->middleware('guest');
	}

	public function prefixLines($text,$prefix){
		$text = preg_replace('/\n/i', "\n".$prefix, $text);
		return $prefix.$text;
	}

	public function blockToCode($block){
		if($block == NULL){
			return '';
		}
		if($block->nodeName != 'block'){
			return "xml Wrong".$block->nodeName;
		}
		$type = $block->getAttribute('type');
		switch($type){
			case 'controls_if':{return $this->controls_if($block); break;}
			case 'logic_boolean':{return $this->logic_bool($block);break;}
			case 'logic_compare':{return $this->logic_compare($block);break;}
			case 'logic_operation':{return $this->logic_operation($block);break;}
			case 'bitwise_operator':{return $this->bitwise_operator($block);break;}
			case 'logic_negate':{return $this->logic_negate($block);break;}
			case 'logic_ternary':{return $this->logic_ternary($block);break;}
			case 'logic_null':{return $this->logic_null($block);break;}

			case 'controls_repeat_ext':{return $this->controls_repeat_ext($block);break;}
			case 'controls_whileUntil':{return $this->controls_whileUntil($block);break;}
			case 'controls_for':{return $this->controls_for($block);break;}
			case 'controls_flow_statements':{return $this->controls_flow_statements($block);break;}
			
			case 'io_buzzer':{return $this->buzzer_msec($block);break;}
			case 'text':{return $this->textvalue($block);break;}
			case 'text_print':{return $this->prints($block);break;}
			case 'display_init':{return $this->LCD_init($block);break;}
			case 'display_cursor':{return $this->cursor($block);break;}
			case 'display_channel':{return $this->channel($block);break;}
			case 'math_number':{return $this->math_number($block);break;}
			case 'motion':{return $this->motion($block);break;}
			case 'turn': {return $this->turn($block);break;}
			case 'soft_turn':{return $this->soft_turn($block);break;}
			case 'back_turn':{return $this->back_turn($block);break;}
			case 'velocity':{return $this->velocity($block);break;}
			case 'position_motion':{return $this->position_motion($block);break;}
			case 'position_turn': {return $this->position_turn($block);break;}
			case 'position_turn_soft':{return $this->position_turn_soft($block);break;}
			case 'position_turn_back':{return $this->position_turn_back($block);break;}
			case 'sensor_white':{return $this->sensor_white($block);break;}
			case 'sensor_sharp':{return $this->sensor_sharp($block);break;}
			case 'sensor_ir':{return $this->sensor_ir($block);break;}
			case 'buzzer_on':{return $this->buzzer_on($block);break;}
			case 'buzzer_off':{return $this->buzzer_off($block);break;}
			case 'delay_ms':{return $this->delay_ms($block);break;}
			case 'math_arithmetic':{return $this->math_arithmetic($block);break;}
			case 'math_single':{return $this->math_single($block);break;}
			case 'math_trig':{return $this->math_trig($block);break;}
			case 'math_number_property':{return $this->math_number_property($block);break;}
			case 'math_change':{return $this->math_change($block);break;}
			case 'math_modulo':{return $this->math_modulo($block);break;}
			case 'type_casting':{return $this->type_casting($block);break;}
			case 'register':{return $this->register($block);break;}
			case 'pin':{return $this->pin($block);break;}
			case 'set_item':{return $this->set_item($block);break;}
			case 'call_function':{return $this->call_function($block);break;}
			case 'call_function_with_return':{return $this->call_function_with_return($block);break;}
			case 'procedures_defreturn':{return $this->procedures_defreturn($block);break;}
			case 'procedures_defnoreturn':{return $this->procedures_defnoreturn($block);break;}
			case 'procedures_callnoreturn':{return $this->procedures_callnoreturn($block);break;}
			case 'procedures_callreturn':{return $this->procedures_callreturn($block);break;}
			case 'procedures_ifreturn':{return $this->procedures_ifreturn($block);break;}
			case 'hex':{return $this->hex($block);break;}
			case 'return':{return $this->returnr($block);break;}
			case 'variable_get':{return $this->variable_get($block);break;}
			case 'incl_ude':{return $this->incl_ude($block);break;}
			case 'define':{return $this->def_ine($block);break;}
			case 'variables_set':{return $this->variables_set($block);break;}
			case 'variables_get':{return $this->variables_get($block);break;}
			case 'int_serv_routine':{return $this->isRoutine($block);break;}
			case 'int_signal':{return $this->isSignal($block);break;}
			case 'devices':{return $this->devices($block);break;}
			case 'Initialise':{return $this->Initialise($block);break;}
			case 'io_switch':{return $this->io_switch($block);break;}
			case 'io_ledbargraph':{return $this->io_ledbargraph($block);break;}
			case 'display_text':{return $this->display_text($block);break;}
			default : {echo "not defined in blockToCode ".$block->getAttribute('type');}
		}
	}

	//generates the code structure
	public function xmlToCode($xmlDoc){
		$code="";
		$blocks = $xmlDoc->getElementsByTagName('xml')->item(0)->childNodes;
		foreach($blocks as $block){
			$arg = $this->blockToCode($block);
			$code  = $code."\n\n".$arg;
			$blockr = $block->lastChild;
			while($blockr != NULL && $blockr->nodeName == 'next'){
				$blockr= $blockr->firstChild;
				$code = $code."\n".$this->blockToCode($blockr);
				$blockr = $blockr->lastChild;
			}
		}
		//global $string;
		 self::$strings = self::$fcpu."\n".join("\n",self::$definitions).$code;	
		//return $string;
		
		//$string = preg_replace('/[\n]+/mi', '\n', $string);
		//$string = preg_replace('/[ ]+/mi', ' ',$string);
		//$_SESSION['file'] = $string;

		//header('Location:../gcc/compile.php'); 

	}


	public function getFieldValue($block,$name){
		$i=0;
		$field = $block->getElementsByTagName('field')->item($i);
		while($field != NULL){
			if($field->getAttribute('name') == $name){
				//echo $field->getAttribute('name');
				$code = $field->nodeValue;
				return $code;
			}
			else{
				$i++;
				$field = $block->getElementsByTagName('field')->item($i);
			}
		}
		return "";
	}

	public function statementToCode($block,$name,$n){  // Restructure this code still doubtful
		$code = "";
		$test = $block->firstChild;
		if($test != NULL){
			if($test->nodeName != 'next'){
			$statement = $block->getElementsByTagName('statement')->item($n);
			if($statement !=NULL){
				$statement = $statement->firstChild;
				while($statement != NULL){
					if($statement->nodeName == 'next'){
						$statement = $statement->firstChild;	
					}
					else if($statement->nodeName =='block'){
						$arg =$this->blockToCode($statement);
						if($arg != null)
							$arg = $this->prefixLines($arg,'	');
						$code = $code."\n".$arg;
						$statement = $statement->lastChild;
					}
					else{
						$statement = NULL;
					}
				}
			}
			return $code."\n";
			}
		}
		return "";
	}

	public function valueToCode($block,$name){
		$i=0;
		$values = $block->getElementsByTagName('value');
		$value = $values->item($i);
		while($value != NULL){
			if(($value->getAttribute('name') == $name) && ($value->parentNode->getAttribute('id') == $block->getAttribute('id'))){
				$value = $value->firstChild;
				$code = $this->blockToCode($value);
				return $code;
			}else{
				$i++;
				$value = $values->item($i);
			}
		}
		return "";
	}

	public function getArgs($block){
		$mutator = $block->getElementsByTagName('mutation')->item(0);
		$args = array();
		if($mutator->hasChildNodes()){
			$mutate = $mutator->getElementsByTagName('arg');
			$i=0;
			foreach($mutate as $mutate){
				$args[$i] = $mutate->getAttribute('name');
				$i++;
			}
			return $args;
		}
	}


	public function math_number($block){
		$code = $this->getFieldValue($block,"NUM");
		$code = $code != NULL?$code:"0";
		return $code;
	}

	//LOGIC TABS

	public function controls_if($block){
		$mutation = $block->getElementsByTagName('mutation')->item(0);
		$n=0;
		$value = $this->valueToCode($block,"IF".$n);
		$value = ($value!=NULL)?$value:'0';
		$statements = $this->statementToCode($block,"DO",$n);
		$code = "if(".$value."){\n".$statements."}";
				
			$no = strval($mutation->getAttribute('elseif'));
			$i=1;
			for($i=1;$i<=$no;$i++){
				$val =  $this->valueToCode($block,"IF".$i);
				$val = ($val!=NULL)?$val:'0';
				$stat = $this->statementToCode($block,"DO",$i);
				$code = $code."else if(".$val."){\n".$stat."}";
			}
			if (strval($mutation->getAttribute('else')))
			{
				$code = $code."else{\n".$this->statementToCode($block,"ELSE",$i)."}";
			}
		
		return $code;
	}
	/*public function controls_if($block) {
  // If/elseif/else condition.
  $n = 0;
  $argument = $this->valueToCode($block, "IF".$n);
  $argument = ($argument!=NULL)?$argument:"0";    
  $branch = $this->statementToCode($block, "DO".$n);
  $code = "if (".$argument.")\n {\n".$branch."}"; 
  for ($n = 1; $n <= $this->elseifCount_; $n++) {
    $argument = $this->valueToCode($block, "IF".$n);
     $argument = ($argument!=NULL)?$argument:"0"; 
    $branch = $this->statementToCode($block, "DO".$n);
    $code = $code."else if (".$argument.")\n {\n".$branch."}";
  }
  if ($this->elseCount_) {
    $branch = $this->statementToCode($block, "ELSE");
    $code = $code."else\n {\n".$branch."}";
  }
  return $code."\n";
}
*/
	public function logic_compare($block){
		$arg0 = $this->valueToCode($block,"A");
		$arg0 = ($arg0!=NULL)?$arg0:'0';
		$arg1 = $this->getFieldValue($block,"OP");
		$arg2 = $this->valueToCode($block,"B");
		$arg2 = ($arg2!=NULL)?$arg2:'0';
		switch($arg1){
			case 'EQ':{$arg1 = ' == ';break;}
			case 'NEQ':{$arg1 = ' != ';break;}
			case 'LT':{$arg1 = ' < ';break;}
			case 'LTE':{$arg1 = ' <= ';break;}
			case 'GT':{$arg1 = ' > ';break;}
			case 'GTE':{$arg1 = ' >= ';break;}
		}
		$code = $arg0.$arg1.$arg2;
		return $code;
	}

	public function logic_bool($block){
		$code = $this->getFieldValue($block,"BOOL");
		$code = ($code == 'TRUE')?'1':'0';
		return $code;
	}

	public function logic_negate($block){
		$code = $this->valueToCode($block,"BOOL");
		return "!".$code;
	}
	public function logic_operation($block){
		$arg0 = $this->valueToCode($block,"A");
		$arg0 = ($arg0!=NULL)?$arg0:'0';
		$arg1 = $this->getFieldValue($block,"OP");
		$arg2 = $this->valueToCode($block,"B");
		$arg2 = ($arg2!=NULL)?$arg2:'0';
		switch($arg1){
			case 'AND':{$arg1 = ' && ';break;}
			case 'OR':{$arg1 = ' || ';break;}
		}
		$code = $arg0.$arg1.$arg2;
		return $code;
	}

	public function bitwise_operator($block){
		$arg0 = $this->valueToCode($block,"A");
		$arg0 = ($arg0!=NULL)?$arg0:'0';
		$arg1 = $this->getFieldValue($block,"OP");
		$arg2 = $this->valueToCode($block,"B");
		$arg2 = ($arg2!=NULL)?$arg2:'0';
		switch($arg1){
			case 'BITAND':{$arg1 = ' & ';break;}
			case 'BITOR':{$arg1 = ' | ';break;}
		}
		$code = $arg0.$arg1.$arg2;
		return $code;	
	}


	public function logic_ternary($block){
		$condition = $this->valueToCode($block,"IF");
		$then = $this->valueToCode($block,"THEN");
		$else = $this->valueToCode($block,"ELSE");

		return "(".$condition.")?".$then.":".$else.";";
	}

	public function logic_null($block){
		return "null";
	}

	//LOOPS

	public function controls_repeat_ext($block){
		$repeats = $this->valueToCode($block,"TIMES");
		$repeats = ($repeats!=NULL)?$repeats:'0';
		$statements = $this->statementToCode($block,"DO",0);
		return "for(int countz=1;countz<=".$repeats.";countz++){".$statements."}";
	}
	
	public function controls_whileUntil($block){
		$mode = $this->getFieldValue($block,"MODE");
		$arg = $this->valueToCode($block,"BOOL");
		$arg = ($arg!=NULL)?$arg:'0';
		$statements = $this->statementToCode($block,"DO",0);
		if($mode == 'UNTIL'){
			$arg = '!'.$arg;
		}
		return "while(".$arg."){".$statements."}";
	}

	public function controls_for($block){
		$name_item = $this->getFieldValue($block,"VAR");
		$to_val = $this->valueToCode($block,'TO');
		$from_val = $this->valueToCode($block,'FROM');
		$by_val = $this->valueToCode($block,'BY');
		$statements = $this->statementToCode($block,"DO",0);
		return "for(int ".$name_item."=".$from_val.";".$name_item."<=".$to_val.";".$name_item."=".$name_item."+".$by_val."){".$statements."}";
	}

	public function controls_flow_statements($block){
		$code = $this->getFieldValue($block,"FLOW");
		switch($code){
			case 'BREAK':{$code = "break;";break;}
			case 'CONTINUE':{$code = "continue;";break;}
		}
		return $code;
	}



	//TEXT
	public function prints($block){
		$code = $this->valueToCode($block,'TEXT');

		return "printf(".$code.");";
	}


	public function textvalue($block){
		$code = $this->getFieldValue($block,"TEXT");
		return "\"".$code."\"";
	}

	//IO
	public function buzzer_msec($block){
		
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$time = $this->valueToCode($block,"buzzer");
		$time = ($time!=NULL)?$time:'0';
		return "buzzer_ms(".$time.");";
	}

	//IO
	public function Initialise($block){
		
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$device = $this->valueToCode($block,"Initialise");
		
		return $device;
	}

	public function devices($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->getFieldValue($block,"device");
		$code = "init_devices();";
	    
	  return $code;
	}

	public function io_switch($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->getFieldValue($block,"status");
		$code='';
	   switch ($arg) {
	    case 'press':{$code = '((PINE & 0x80) != 0x80)';break;}
	    case 'not_press':{$code = '((PINE & 0x80) == 0x80)';break;}
		
	   }

	  return $code;
	}

	public function io_ledbargraph($block){
	
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$check_s = $this->getFieldValue($block,"check");
		$check_l = $this->getFieldValue($block,"LED_no");
		$code='';
		if ($check_s == 'on'){
		switch ($check_l) {
	    case 'all':{$code = 'PORTJ = 0xFF;';break;}
	    case '1':{$code = 'PORTJ |= 0x01;';break;}
	    case '2':{$code = 'PORTJ |= 0x02;';break;}
	    case '3':{$code = 'PORTJ |= 0x04;';break;}
	    case '4':{$code = 'PORTJ |= 0x08;';break;}
	    case '5':{$code = 'PORTJ |= 0x10;';break;}
	    case '6':{$code = 'PORTJ |= 0x20;';break;}
	    case '7':{$code = 'PORTJ |= 0x40;';break;}
	    case '8':{$code = 'PORTJ |= 0x80;';break;}
	}
}
	    else{
		switch ($check_l) {
	    case 'all':{$code = 'PORTJ = 0x00;';break;}
	    case '1':{$code = 'PORTJ &= 0xFE;';break;}
	    case '2':{$code = 'PORTJ &= 0xFD;';break;}
	    case '3':{$code = 'PORTJ &= 0xFB;';break;}
	    case '4':{$code = 'PORTJ &= 0xF7;';break;}
	    case '5':{$code = 'PORTJ &= 0xEF;';break;}
	    case '6':{$code = 'PORTJ &= 0xDF;';break;}
	    case '7':{$code = 'PORTJ &= 0xBF;';break;}
	    case '8':{$code = 'PORTJ &= 0x7F;';break;}
	    
	   }


		}
		return $code;
	}


	//MOTION
	public function motion($block){
	
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$motion = $this->getFieldValue($block,"motion");
		
		return $motion."();";
	}


	public function turn($block){
	
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$motion = $this->getFieldValue($block,"turn");
		
		return $motion."();";
	}


	public function soft_turn($block){
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$motion = $this->getFieldValue($block,"turn");
		
		return $motion."();";
	}

	public function back_turn($block){
	
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$motion = $this->getFieldValue($block,"turn");
		switch($motion){
			case 'back_right':{$motion = "soft_right_2";break;}
			case 'back_left':{$motion = "soft_left_2";break;}
		}

		return $motion."();";
	}

	public function velocity($block){

		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$left = $this->valueToCode($block,"left");
		$right = $this->valueToCode($block, "right");

		return "velocity(".$left.",".$right.");";
	}

	//POSITIONS
	public function position_motion($block){
	//	global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->valueToCode($block,"motion");
		$motion = $this->getFieldValue($block,"forward");
		switch($motion){
			case 'fwd':{$motion = "forward_mm";break;}
			case 'back':{$motion = "back_mm";break;}
		}
		return $motion."(".$arg.");";
	}

	public function position_turn($block){
	//	global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->valueToCode($block,"motion");
		$arg = $arg%360;
		$motion = $this->getFieldValue($block,"forward");
		switch($motion){
			case 'right':{$motion = 'right_degrees';break;}
			case 'left':{$motion = 'left_degrees';break;}
		}
		return $motion."(".$arg.");";
	}

	public function position_turn_soft($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->valueToCode($block,"soft_turn");
		$arg = $arg%360;
		$motion = $this->getFieldValue($block,"forward");
		switch($motion){
			case 'right':{$motion = 'soft_right_degrees';break;}
			case 'left':{$motion = 'soft_left_degrees';break;}
		}
		return $motion."(".$arg.");";
	}

	public function position_turn_back($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->valueToCode($block,"back_turn");
		$arg = $arg%360;
		$motion = $this->getFieldValue($block,"forward");
		switch($motion){
			case 'right':{$motion = 'soft_right_2_degrees';break;}
			case 'left':{$motion = 'soft_left_2_degrees';break;}
		}
		return $motion."(".$arg.");";
	}

	public function sensor_white($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->getFieldValue($block,"line_sensor");
		$code='';
	   switch ($arg) {
	    case 'center':{$code = 'ADC_Conversion(2)';break;}
	    case 'left':{$code = 'ADC_Conversion(3)';break;}
		case 'right':{$code = 'ADC_Conversion(1)';break;}
	   }

	  return $code;
	}

	public function sensor_sharp($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->getFieldValue($block,"sharp");
		$code = "";
	    switch ($arg) {
	     case 'fr':{$code = 'sharp_Conversion(11)';break;}
	     case 'lf':{$code = 'sharp_Conversion(9)';break;}
		 case 'rf':{$code = 'sharp_Conversion(13)';break;}
		 case 'ld':{$code = 'sharp_Conversion(10)';break;}
		 case 'rd':{$code = 'sharp_Conversion(12)';break;}   
	  	}

	  return $code;
	}

	public function sensor_ir($block){
		
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		$arg = $this->getFieldValue($block,"ir");
		return $arg;
	}

	public function buzzer_on($block){
		
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		return "buzzer_on();";
	}

	public function buzzer_off($block){
		// global $definitions;
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		return "buzzer_off();";
	}

	public function delay_ms($block){
		
		self::$definitions['includedelay'] = "#include <util/delay.h>";
		$value = $this->valueToCode($block,"delay_value");
		$value = $value!= NULL?$value:"0";
		return "_delay_ms(".$value.");";
	}


	//MATHS

	public function math_arithmetic($block){
		// global $definitions;
		$arg0 = $this->valueToCode($block,"A");
		$arg0 = ($arg0!=NULL)?$arg0:'0';
		$arg1 = $this->getFieldValue($block,"OP");
		$arg2 = $this->valueToCode($block,"B");
		$arg2 = ($arg2!=NULL)?$arg2:'0';
		switch($arg1){
			case 'ADD':{$arg1 = ' + ';break;}
			case 'MINUS':{$arg1 = ' - ';break;}
			case 'MULTIPLY':{$arg1 = ' * ';break;}
			case 'DIVIDE':{$arg1 = ' / ';break;}
			case 'POWER':{break;}
		}

		if($arg1 == 'POWER'){
			self::$definitions['includemath'] = "#include <math.h>";
			return "pow(".$arg0.",".$arg1.");";
		}
		$code = $arg0.$arg1.$arg2;
		return $code;
	}

	public function math_single($block){
		$arg = $this->getFieldValue($block,"OP");
		$value = $this->valueToCode($block,"NUM");
		$value = $value!=NULL?$value:'0';
		// global $definitions;
		if($arg != 'NEG'){
			self::$definitions['includemath'] = "#include <math.h>";
		}
		$code = "";
		switch($arg){
			case 'ROOT':{$code = "sqrt(".$value.")";break;}
			case 'ABS':{$code = "abs(".$value.")";break;}
			case 'NEG':{$code = "(-".$value.")";break;}
			case 'LN':{$code = "ln(".$value.")";break;}
			case 'LOG10':{$code = "log(".$value.")/log(10)";break;}
			case 'EXP':{$code = "exp(".$value.")";break;}
			case 'POW10':{$code = "pow(10,".$value.")";break;}
		}

		return $code;
	}

	public function math_trig($block){
		$arg = $this->getFieldValue($block,"OP");
		$value = $this->valueToCode($block,"NUM");
		$value = $value!=NULL?$value:'0';
		$value = strval((3.1416/180)*floatval($value));
		// global $definitions;
		self::$definitions['includemath'] = "#include <math.h>";
		$code = "";
		switch($arg){
			case 'SIN':{$code = "sin(".$value.")";break;}
			case 'COS':{$code = "cos(".$value.")";break;}
			case 'TAN':{$code = "tan".$value.")";break;}
			case 'ASIN':{$code = "asin(".$value.")";break;}
			case 'ACOS':{$code = "acos(".$value.")";break;}
			case 'ATAN':{$code = "atan(".$value.")";break;}
		}

		return $code;
	}

	
	public function math_number_property($block){
		$arg = $this->getFieldValue($block,"PROPERTY");
		$value = $this->valueToCode($block,"NUMBER_TO_CHECK");
		$value = $value!=NULL?$value:'0';
		// global $definitions;
		self::$definitions['includemath'] = "#include <math.h>";
		$code = "";
		switch($arg){
			case 'EVEN':{$code = $value." % 2 == 0";break;}
			case 'ODD':{$code = $value." % 2 == 1";break;}
			case 'WHOLE':{$code = $value." % 1 == 0";break;}
			case 'POSITIVE':{$code = $value." > 0";break;}
			case 'NEGATIVE':{$code = $value." < 0";break;}
			case 'DIVISIBLE_BY':{
				$divisor_val = $this->valueToCode($block,"DIVISOR");
				$divisor_val = $divisor_val!=NULL?$divisor_val:'1';
				if(!$divisor_val)
					$code = "Division by 0";
				else
					$code = $value.' % '.$divisor_val.' == 0';
				break;}
		}

		return $code;
	}

	public function math_change($block){
		$change_by = $this->valueToCode($block,"DELTA");
		$var_name = $this->getFieldValue($block,"VAR");
		return $var_name." = ".$var_name." + ".$change_by.";";
	}

	public function math_modulo($block){
		$dividend = $this->valueToCode($block,"DIVIDEND");
		$divisor = $this->valueToCode($block,"DIVISOR");
		$dividend = $dividend!=NULL?$dividend:"0";
		$divisor = $divisor!=NULL?$divisor:"0";

		return $dividend." % ".$divisor;
	}


	//BASICS


	public function pin($block){
		$code = $this->getFieldValue($block,"pin");
		return $code;
	}

	public function set_item($block){

		$arg = $this->getFieldValue($block,"specifier");
		$arg1 = $this->getFieldValue($block,"polarity");
		$arg5 = $this->getFieldValue($block,"size");
		if($arg == "none"){
			$arg = '';
		}else{
			$arg = $arg.' ';
		}
		if($arg5 == "none"){
			$arg5 = '';
		}else{
			$arg5 = $arg5.' ';
		}
		if($arg1=="signed"){
			$arg1 = '';
		}else{
			$arg1 = $arg1.' ';
		}
		$arg2 = $this->getFieldValue($block,"type");
		$arg3 = $this->getFieldValue($block,"NAME");
		$arg4 = $this->valueToCode($block,"input");
		$arg4 = $arg4 !=NULL? " = ".$arg4:"";
		$code= $arg.$arg1.$arg5.$arg2." ".$arg3.$arg4.";";
		return $code;

	}

	public function check_hex($arg){
		
		if(substr("$arg",0,2)=="0x"){
			if(strlen($arg) == 4){
			  if(ctype_xdigit(substr($arg,-2))){
				
					return 1;
				}	
			}
		}
		return 0;
		
	}

	public function register($block)
	{

		$arg1 = $this->getFieldValue($block,"register");
		$arg2 = $this->getFieldValue($block,"set/reset");
		$arg3 = $this->valueToCode($block,"regex");

		if($arg2=="set"){
			$arg2="|";
		}else if($arg2=='none'){
			$code = $arg1." = ".$arg3.";";
			return $code;
		}
		else{
			$arg2="&";
		}
		$code=$arg1."=".$arg1." ".$arg2." ".$arg3.";";

		return $code;
	}

	public function call_function($block)
	{
		$args=array();
		$args=$this->getArgs($block);
		$funcName=$this->getFieldValue($block,"NAME");
		 if(count($args)!=NULL){
		 	return $funcName."(".join(", ",$args).");";
		 }
		 else{
		 	return $funcName."();";
		 }


	}
	public function call_function_with_return($block)
	{
		$args=array();
		$args=$this->getArgs($block);
		$funcName=$this->getFieldValue($block,"NAME");
		if(count($args)!=NULL){
			return $funcName."(".join(", ",$args).");";
		}
		else{
			return $funcName."();";
		}


	}
	public function procedures_defnoreturn($block){

		$funcName = $this->getFieldValue($block,"NAME");
		$statements = $this->statementToCode($block,"STACK",0);
		$args = array();
		$args = $this->getArgs($block);
		/*foreach(array_values($args) as $arg){
			$code = $code.','.$arg;
		}*/
		if(count($args)!=NULL){
		return "void ".$funcName."(".join(", ",$args)."){\n".$statements."}";
	    }
		else{
			return "void ".$funcName."(){"."\n".$statements."}";
	    }
	}

	public function procedures_defreturn($block){
		$type=   $this->getFieldValue($block,"types");
		$funcName = $this->getFieldValue($block,"NAME");
		$statements = $this->statementToCode($block,"STACK",0);
		$args=array();
		$args=$this->getArgs($block);
		$return = $this->valueToCode($block,"RETURN");
		//echo "$return";
		$return = $return !=NULL? $return:'0';

	    if(count($args)!=NULL){
			return "$type ".$funcName."(".join(", ",$args)."){\n".$statements."\n return"." ".$return."; \n};";
	    }else{
			return "$type ".$funcName."() {\n".$statements."\n return ".$return.";\n}";
	    }
	}

	//CALL public functionS

	public function procedures_callnoreturn($block){
		$mutate = $block->firstChild;
		if($mutate->nodeName == 'mutation'){
			$funcName = $mutate->getAttribute('name');
			$args = $this->getArgs($block);
			$i=0;
			$argcode = array();
			if($args != NULL){
				foreach($args as $arg){
					$argcode[$i] = $this->valueToCode($block,"ARG".$i);
					$i++;
				}
				return $funcName."(".join(", ",$argcode).");";
			}else{
				return $funcName."();";
			}
		}
		return null;
	}

	public function procedures_callreturn($block){
		$mutate = $block->firstChild;
		if($mutate->nodeName == 'mutation'){
			$funcName = $mutate->getAttribute('name');		
			$args = $this->getArgs($block);
			$i=0;
			$argcode = array();
			if($args != NULL){
				foreach($args as $arg){
					$argcode[$i] = $this->valueToCode($block,"ARG".$i);
					$i++;
				}
				return $funcName."(".join(", ",$argcode).")";
			}else{
				return $funcName."()";
			}

		}
		return null;
	}

	public function procedures_ifreturn($block){
		$condition = $this->valueToCode($block, 'CONDITION');
        $condition = $condition != NULL? $condition:'false';
		$code = "if (".$condition.") {\n";
		 
    		$value = $this->valueToCode($block, 'VALUE');
        	$value = $value != NULL? $value : 'null';
    		$code = $code."  return ".$value.";\n";
  		
  		$code = $code."}\n";
  		return $code;
	}

	

	public function hex($block){
		$value = $this->getFieldValue($block,'HEX');
		return $value;
	}

	public function returnr($block){
		$retval = $this->valueToCode($block,"RETURN");
		return "return ".$retval.";";
	}


	public function valriable_get($block){
		$field = $this->getFieldValue($block,"VAR");
		return $field;
	}


	public function incl_ude($block){
		$incl = $this->getFieldValue($block,"header file");

		return "#include \"".$incl."\"";
	}


	public function def_ine($block){
		$defval = $this->getFieldValue($block,"name");
		$defreplace = $this->getFieldValue($block,"value");
		if($defval =='F_CPU'){
			
			self::$fcpu = "#define ".$defval." ".$defreplace;
			return '';
		}
		return "#define ".$defval." ".$defreplace."\n";

	}

	public function display_text($block){
		$row = $this->valueToCode($block,'row');
		$col = $this->valueToCode($block,'column');
		$digit = $this->getFieldValue($block,'text');
		$code = '';
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		
		      $code = "lcd_print_text(".$row.",".$col.",\"".$digit."\");";
		     
  		return $code;
	}

	public function LCD_init($block){

		//self::$definitions['includelcd'] = "#include \"lcd.c\"";
		$code = "lcd_init();\nlcd_set_4bit();\n";

		return $code;
	}

	public function cursor($block){
		
		$pos = $this->getFieldValue($block,'position');
		$value = $this->valueToCode($block,'Cursor');
		$value = $value!=NULL ? $value : '1';
		$code = '';
		switch ($pos) {
	    case 'row': {$code = "row_pos= ".$value.";\n";break;}
	    case 'column': {$code = "column_pos= ".$value.";\n";break;}
  		}
		return $code;
	}

	public function channel($block){
		
		$arg = $this->valueToCode($block,'channel');
		$arg = $arg != NULL?$arg:'0';
		$row = $this->valueToCode($block,'row');
		$col = $this->valueToCode($block,'column');
		$digit = $this->getFieldValue($block,'digit');
		$code = '';
		self::$definitions['includefirebird'] = "#include \"firebird.h\"";
		
		      $code = "lcd_print(".$row.",".$col.",".$arg.",".$digit.");";
  		return $code;
	}


	public function variables_set($block){
		$item = $this->getFieldValue($block,"VAR");
		$value = $this->valueToCode($block,"VALUE");

		return $item." = ".$value.";\n";
	}

	public function variables_get($block){
		$item = $this->getFieldValue($block,"VAR");
	
		return $item;
	}


	public function isRoutine($block){
		$vector = $this->getFieldValue($block,"VECTOR");
		$attribute = $this->getFieldValue($block,"ATTR");
		$bloc = $this->statementToCode($block, "BLOC",0);
		if($attribute != 'attribute'){
			$attribute = ', '.$attribute;
		}else{
			$attribute = '';
		}
		return 'ISR('.$vector.$attribute.'){'.$bloc.'}';
	}

	public function isSignal($block){
		$vector = $this->getFieldValue($block,"VECTOR");
		$bloc = $this->statementToCode($block, "BLOC",0);
		return 'SIGNAL('.$vector.'){'.$bloc.'}';
	}

	public function type_casting($block){
		$type = $this->getFieldValue($block,"TYPECAST");
		$value = $this->valueToCode($block,"VAL");
		$code = "(".$type.") ".$value;
		return $code;
	}

	/**
	 * Show the application welcome screen to the user.
	 *
	 * @return Response
	 */
	public function parse()
	{

	
		if(Request::ajax()){
			$data = Input::all();
			$file = $data['xmlText'];

			$file = preg_replace('/>[ ]*</mi', '><', $file); 
			$xmlDoc = new \DOMDocument();
			$xmlDoc->loadXML($file);
			self::$definitions['includeavrio'] = "#include <avr/io.h>";
			self::$definitions['includeinterrupt'] = "#include <avr/interrupt.h>";
			self::$definitions['includedelay'] = "#include <util/delay.h>";
			$this->xmlToCode($xmlDoc);
			print_r(self::$strings);
			$_SESSION['file'] = self::$strings;
			header('Location: /gcc/compile.php');

		}
		
	    // Escape any html characters
		//Get the xml file
		//removes all the blank spaces
		//$file = preg_replace('/>[ ]*</mi', '><', $file); 

		//Instantiates and Loads the xml File
		//$xmlDoc = new DOMDocument();
		//$xmlDoc->loadXML($file);
		//actual shit to do
		//return echo xmlToCode($xmlDoc);
		}
	}