//alert("grrr")
//this is where the textbox info is sent to show on the alert dialog
chrome.runtime.onMessage.addListener(function(request){
   alert(request)
   const to_respond = request.stringify()
   //redirect("/index.js")
   //app.get('/capture', (req, res) => res.render('pages/scan_image'));

})



const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
mood="happy"
input= to_respond

function inputPass(input, mood){
    responseGenerator(input, mood)

}


async function responseGenerator (input, mood) {
    mood = oppositeMood(mood)
    let inputMessage = "write a response message to" + input + "in a" + mood + "tone"
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: inputMessage,
        max_tokens: 1000,
    });
    // console.log(completion.data.choices[0].text);
    // getReturnMessage(completion.data.choices[0].text)
    return completion.data.choices[0].text
}


async function oppositeMood (moodInput) {
    let opposite = ("what is the opposite of" + moodInput)
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: opposite,
        max_tokens: 1000,
    });
    // console.log(completion.data.choices[0].text);
    // getReturnMessage(completion.data.choices[0].text)
    return completion.data.choices[0].text
}

// export default Chat

(async () => {
    input = "i want food"
    mood = "angry"
    response = (await responseGenerator(input, mood))
    console.log(response)
})()

// while(1){ 

//     (async () => {
//         response = (await responseGenerator(input, mood))
//         console.log(response)
//     })()
// }

//gpt 3 api key
//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