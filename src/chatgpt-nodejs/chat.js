// import axios from 'axios'
const http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors") //cross-origin resource sharing
const axios = require('axios')
const url = require('url')
var app = express();
var resdata = []


const path = require('path')
const PORT = process.env.PORT || 5010;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
//app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
    // apiKey: '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',
    apiKey: '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'
});
const openai = new OpenAIApi(configuration);


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


async function getTranslation(URL){
    const res = await axios.get(URL);
    // console.log(res)
    return res
}

// export default Chat
app.post('/chatrecvm', async (req, res) => {
	let emotion = req.body.emotion
	let txt = req.body.textString
	
	console.log("Passthru: ", emotion, txt)
    response = (await responseGenerator(txt, emotion))
    let URL = "https://translate-server.herokuapp.com/combine/" + response
    let translation = (await getTranslation(URL))
    console.log(response)
    console.log(translation)
	
});

app.get('/chatrecvm', (req,res) => {
	res.json("NULL");
})
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});

app.use((req, res) => {
    res.status(404);
});

