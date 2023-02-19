function senddata(emo,txt) {
	var txtFile = new XMLHttpRequest();
	    txtFile.open("POST", "/plantscanner-api/image64_test");

	    txtFile.setRequestHeader("Accept", "application/json");
	    txtFile.setRequestHeader("Content-Type", "application/json");

	    let image_encoded = `{
	     "emotion": "${emo}",
		 "textString": "${txt}"
	    }`;
	    txtFile.onload = function (e) {
	        if (txtFile.readyState === 4) {
	            if (txtFile.status === 200) {
	                var csvData = txtFile.responseText;

	                console.log(csvData, "Response");


	            }
	            else {
	                console.error(txtFile.statusText);
	            }
	        }
	    };

	    txtFile.onerror = function (e) {
	        console.error(txtFile.statusText);
	    };

	    txtFile.send(image_encoded);
}


document.addEventListener('DOMContentLoaded', function(){
    //when the user clicks the submit button in the popup.html
    document.getElementById('button').addEventListener('click', onclick, false)
    function onclick(){
       
        //chrome.runtime.sendMessage()
        
        //the function onlick is called we look at the tab that is currently open
        chrome.tabs.query({currentWindow: true, active: true}, 
        //this function looks at the popup.html "respond to" textbox
        //grabs the value and sends the message to context.js    
        function(tabs){
            const text = document.getElementById('respondtext').value
            chrome.tabs.sendMessage(tabs[0].id, text)
        })
    }
}, false)