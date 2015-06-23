'use strict'

function parseXml(){
        


var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
var xmlhttp;

//alert(xmlText);
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    //alert(xmlhttp.responseText);
    window.location.href="php/parse.php?xmlText="+xmlText;
    }
  }
xmlhttp.open("POST","php/parse.php?xmlText="+xmlText,true);
xmlhttp.send();



};