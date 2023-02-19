const http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors") //cross-origin resource sharing
const axios = require('axios')
const url = require('url')
const { v4: uuidv4 } = require('uuid');
// Express app = new Express();
// Express app;
// app.method();
// Express* app = new Express;
// app->method();

var PlayerData = []
var prevTime = 0;

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: true})
app.use(express.static('public'));

const port = process.env.PORT || 3000

async function translate(src, dst, dataStr) {

    var results = null;
	let key = "bf64e7764df6498ba3bbcb0c5e236605";
	let endpoint = "https://api.cognitive.microsofttranslator.com";

	    // location, also known as region.
	    // required if you're using a multi-service or regional (not global) resource. It can be found in the Azure portal on the Keys and Endpoint page.
	let location = "westus2";
	
    // arguments to send to api
	const transdata = {
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
             // location required if you're using a multi-service or regional (not global) resource.
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': src,
            'to': dst
        },
        data: [{
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

async function recurseTranslate(iterations, base) {
	let langPool = ['ja', 'lzh', 'ko', 'fa', 'ar', 'vi', 'cy', 'es', 'sr-Cyrl', 'pa']
	var resultant = base
	var currLan = 'en'
	for (var i=0;i<iterations;i++) {
		const lan2 = langPool[Math.floor(Math.random() * langPool.length)]
		console.log("RESU: ", currLan, lan2, resultant);
		resultant = await translate(currLan, lan2, resultant)
		resultant = resultant[0].translations[0].text
		currLan = lan2
	}
	
	resultant = await translate(currLan, 'en', resultant)
	console.log("RESU: ", currLan, 'en', resultant[0].translations[0].text);
	return resultant[0].translations[0].text
}

async function recurseTranslate_app(iterations, base) {
	let langPool = ['ja', 'lzh', 'ko', 'fa', 'ar', 'vi', 'cy', 'es', 'sr-Cyrl', 'pa']
	var resultant = [base]
	var currLan = 'en'
	for (var i=0;i<iterations;i++) {
		const lan2 = langPool[Math.floor(Math.random() * langPool.length)]
		var res = await translate(currLan, lan2, resultant[resultant.length - 1])
		res = res[0].translations[0].text
		resultant.push(res);
		currLan = lan2
	}
	
	var res = await translate(currLan, 'en', resultant[resultant.length - 1])
	res = res[0].translations[0].text
	resultant.push(res);
	
	return resultant;
}

app.get('/', (req,res) =>{
	res.json("Send a request by /list:<translation_string>, /combine:<translation_string>, or /singular:<source>:<dest>:<translation_string>")
});
app.get('/list/:translate', async (req, res) => {
	const text = req.params.translate
	var res2 = await recurseTranslate_app(5,text);
	res.json(res2);
});
app.get('/combine/:translate', async (req, res) => {
	const text = req.params.translate
	var result = await recurseTranslate(5, text);
	res.json(result);
});

app.get('/singular/:slang/:dstlang/:srctxt', async (req, res) => {
	const l1 = req.params.slang
	const l2 = req.params.dstlang
	const text = req.params.srctxt
	
	var result = await translate(l1, l2, text)
	res.json(result[0].translations[0].text);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use((req, res) => {
    res.status(404);
});

