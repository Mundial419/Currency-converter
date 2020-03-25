		
var SpeechRecognition = window.webkitSpeechRecognition;
 var recognition = new SpeechRecognition();

var instructions = document.querySelector("#instructions");
 
recognition.onstart = function() { 
  instructions.innerHTML = 'Voice recognition is ON.';
};
 
recognition.onspeechend = function() {
  instructions.innerHTML = 'No Activity .';
};
 
recognition.onerror = function(event) {
  if(event.error == 'no-speech') {
    instructions.innerHTML = 'Try again.'; 
  }
};

recognition.onresult = function(event) {
	var current = event.resultIndex;
	var transcript = event.results[current][0].transcript;
	Create(transcript);
	var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript); 
	if (mobileRepeatBug) { 
	txt.value += transcript;
	};
};

var startVoice = function(e) {
	return  recognition.start();
};

function update()
{
	var idoc = document.getElementById('iframe').contentWindow.document;

	idoc.open();
	idoc.write(editor.getValue());
	idoc.close();
}

function setupEditor()
{
  window.editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/html");
	
  editor.setValue("",1);
 //1 = moves cursor to end
	/*var customPosition = {
    row: ,
    column: 0
};

var text = "This text has been dinamically inserted";

editor.session.insert(editor.getCursorPosition() , text);*/
  editor.getSession().on('change', function() {
    update();
  });

  editor.focus();
  
  
  editor.setOptions({
    fontSize: "14pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: false, enableLiveAutocompletion: false });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
}

setupEditor();
update();
  
function Create(transcript) {
		var element = /create/;
		if (element.test(transcript) === true) {
			var splitter = transcript.split(' ');
			checkString = elementsArray.indexOf(splitter[1]);
			if (checkString > -1) {
				var bbb= "<" + elementsArray[checkString] + ">" + " " + "<" + "/" + elementsArray[checkString] + ">";

		//		var bb = document.querySelector("#hh");
					return editor.session.insert(editor.getCursorPosition() , bbb);
				}
			}
			
			else {
			return alert("Shit aint working bro");
			}
};



 