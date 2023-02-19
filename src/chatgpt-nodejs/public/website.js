let textbox = document.getElementById('search');

      textbox.addEventListener('keypress', function(k) {

        if (k.key == 'Enter') {

          Generate_message(textbox.value);

          textbox.value = '';
          //!-- Disappears text in textbox -->

        }

    });

function Generate_message(input_text) {

  var message_list = document.getElementsByClassName("messages");

  if (message_item != null);

    var message_item  = message_list[0];

    var x = `<div id = 'message_bubble'> ${input_text} </div>`
    
    var message_node = document.createRange().createContextualFragment(x);
    message_item.appendChild(message_node);
}

function callHome_30_s() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       // Typical action to be performed when the document is ready:
	       document.getElementById("demo").innerHTML = xhttp.responseText;
	    }
	};
	xhttp.open("GET", "http://localhost:5010", true);
	xhttp.send();
}



      