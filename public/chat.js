
module.export = {responseGenerator}

const { Configuration, OpenAIApi } = require("openai");
const input = require('content') 
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


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
