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
    apiKey: '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',
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

// export default Chat

async function email(addr, dataStr) {
    var results = null;
	let endpoint = "http://localhost:8080/";
	
    // arguments to send to api
	const transdata = {
        baseURL: endpoint,
        method: 'post',
        headers: {
            'Content-type': 'application/json',
			'Access-Control-Allow-Origin':'*'
        },
        data: [{
			'email': addr,
            'text': dataStr
        }],
        responseType: 'json'
    }
	
    await axios(transdata).then(apiRes => {
        results = apiRes.data;
    }).catch(error => {
        console.error('Error: ', error)
    });

    return results;
}

async function translate_arr(dataStr) {

	const endPt = 'http://localhost:3000/list/' + dataStr
    var results = await axios.get(endPt);
    return results;
}

async function translate(dataStr) {

	const endPt = 'http://localhost:3000/combine/' + dataStr
    var results = await axios.get(endPt);
    return results;
}

app.post('/chatrecvm_2', async (req, res) => {
	let emotion = req.body.emotion
	let txt = req.body.textString
	
	console.log("Passthru: ", emotion, txt)
    response = (await responseGenerator(txt, emotion))
	var out = await translate(response);
    console.log(out.data)
	
});

app.post('/chatrecvm', async (req, res) => {
	let emotion = req.body.emotion
	let txt = req.body.textString
	
	console.log("Passthru: ", emotion, txt)
    response = (await responseGenerator(txt, emotion))
	var out = await translate_arr(response);
    resdata = out.data
	
	email('ktzhang@sfu.ca', resdata)
});

app.get('/chatrecvm', (req,res) => {
	res.json(resdata);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});

app.use((req, res) => {
    res.status(404);
});

// while(1){ 

//     (async () => {
//         response = (await responseGenerator(input, mood))
//         console.log(response)
//     })()
// }
