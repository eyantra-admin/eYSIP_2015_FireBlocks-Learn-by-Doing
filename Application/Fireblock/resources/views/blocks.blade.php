@extends('fireblock')

@section('head')
<table width="100%" height="100%">
    <tr>
      <td>
        <h1>
          <a href="/"><img alt="Brand" src="img/EyantraLogoLarge.png" width="170" height="40"></a>
           <a style="visibility: hidden" id="title">...</a> 
    
        </h1>
      </td>
      <td class="farSide">
        <select id="languageMenu"></select>
      </td>
    </tr>
    <tr>
      <td colspan=2>
        <table width="100%">
          <tr id="tabRow" height="1em">
            <td id="tab_blocks" class="tabon">...</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_firebird" class="taboff">FirebirdV</td>
            <td class="tabmin">&nbsp;</td>
            <td id="tab_xml" class="taboff">XML</td>
            <td class="tabmax">
             <!-- <button id="parseButton" data-link="{{ url('/parsing') }}" class="text" title="...">
               Parse
              </button>-->
              <button id="linkButton" class="notext" title="...">
                <img src="{{ asset('/media/1x1.gif') }}" class="link icon21">
              </button>
              <button id="runButton" class="text primary" title="...">
                Execute
              </button>
              <button id="trashButton" class="text" title="...">
                Clear
              </button>
              <button id="saveButton" class="text" onclick="saveTextAsFile()" title="Download and Save C File">
              Save Code
              </button>
              <input type="file" id="files" name="open" >
              <button id='openButton' class="text">Open Xml</button>
              <button id="execButton" onclick="saveXml()">Xml Save</button>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td height="99%" colspan=2 id="content_area">
      </td>
    </tr>
  </table>
  <div id="content_blocks" class="content"></div>
  <pre id="content_firebird" class="content"></pre>
  <textarea id="content_xml" class="content" wrap="off"></textarea>

  <xml id="toolbox" style="display: none">
    <category id="catLogic">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="bitwise_operator"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="hex"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category id="catio">
      <block type="io_buzzer">
        <value name="buzzer">
          <block type="math_number" id="23">
            <field name="NUM">500</field>
          </block>
        </value> 
      </block>
      <block type="io_ledbargraph"></block>
      <block type="io_switch"></block>
    </category>
    <category id="catDisplay">
      <block type="display_init"></block>
       <block type="display_text">
       <value name="row">
          <block type="math_number" id="23">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="column">
          <block type="math_number" id="23">
            <field name="NUM">1</field>
          </block>
        </value> 
       </block>
      <block type="display_channel">
        <value name="row">
          <block type="math_number" id="23">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="column">
          <block type="math_number" id="23">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
    </category>
    <category id="catMotion">
      <block type="motion"></block>
      <block type="turn"></block>
      <block type="soft_turn"></block>
      <block type="back_turn"></block>
      <block type="velocity">
        <value name="left">
          <block type="math_number">
            <field name="NUM">255</field>
          </block>
        </value>
        <value name="right">
          <block type="math_number">
            <field name="NUM">255</field>
          </block>
        </value>
      </block>
    </category>
    <category id="catPosition">
      <block type="position_motion">
        <value name="motion">
          <block type="math_number">
            <field name="NUM">1000</field>
          </block>
        </value>
      </block>
      <block type="position_turn">
        <value name="motion">
          <block type="math_number">
            <field name="NUM">90</field>
          </block>
        </value>
      </block>
      <block type="position_turn_soft">
        <value name="soft_turn">
          <block type="math_number">
            <field name="NUM">90</field>
          </block>
        </value>
      </block>
      <block type="position_turn_back">
        <value name="back_turn">
          <block type="math_number">
            <field name="NUM">90</field>
          </block>
        </value>
      </block>
    </category>
    <category id="catSensor">
      <block type="sensor_white"></block>
      <block type="sensor_sharp"></block>
      <block type="sensor_ir"></block>
    </category>
    <category id="catBuzzer">
      <block type="buzzer_on"></block>
      <block type="buzzer_off"></block>
      <block type="delay_ms">
        <value name="delay_value">
          <block type="math_number">
            <field name="NUM">1000</field>
          </block>
        </value>
      </block>
    </category>
    <category id="catLoops">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <value name="FROM">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
        <value name="TO">
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
        </value>
        <value name="BY">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
      
      <block type="controls_flow_statements"></block>
    </category>
    <category id="catMath">
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="math_single"></block>
      <block type="math_trig"></block>
      <block type="math_number_property"></block>
      <block type="math_change">
        <value name="DELTA">
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
        </value>
      </block>
      <block type="math_modulo"></block>
      <block type="type_casting"></block>
      
    </category>
    
  
    <category id="catVariables" custom="VARIABLE">

    </category>
    <category id="catFunctions" custom="PROCEDURE"></category>
    <!-- <category id="catInterrupts">
      <block type="int_serv_routine"><block>
      <block type="int_signals"><block>
    </category> -->
    <category id="catBasics">
      
      <block type="return"></block>
      <block type="devices"></block>
      <block type="Initialise">
        <value name="Initialise">
          <block type="devices">
          </block>
        </value>
      </block>
      <block type="text"></block>
      
    </category>
    <category id="catPrecursor">
      <block type="incl_ude"></block>
      <block type="define"></block>
      <block type="set_item"></block>

    </category>
  </xml>
@endsection