let textbox = document.getElementById('search');

      textbox.addEventListener('keypress', function(k) {

        if (k.key == 'Enter') {

          Generate_message(textbox.value);

          textbox.value = '';
          //!-- Disappears text in textbox -->

        }

    });

function Generate_message(input_text) {

  var message_list = document.getElementsByClassName("message_input");

  if (message_item != null);

    var message_item  = message_list[0];

    var x = `<div id = 'message_bubble' 
              style= "border-radius: 50px;
                      padding: 5px;

                      font-size: 20px;
                      font-family: Arial;

                      width: max-content;

                      border: solid;
                      
                      justify-content: right;
                      align-item: right:
                      margin-top:
                      background-color: rgb(255, 255, 255);"
                      >${input_text} </div>`
    
    var message_node = document.createRange().createContextualFragment(x);
    message_item.appendChild(message_node);
}

function get_final_english_translation(input_text){
  var message_list = document.getElementsByClassName("message_input");

  if (message_item != null);
  var message_item  = message_list[0];

  var x = input_text
  var message_node = document.createRange().createContextualFragment(x);
  message_item.lastChild(message_node);
  

   
}


      