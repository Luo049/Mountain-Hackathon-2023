import requests
import smtplib, ssl
import sys
import time

from datetime import datetime
from decimal import *

headers_Get = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }

extPath = ""

def translateData(lang, targetlang, source):
    s = requests.Session()
    url = 'https://translate.google.com/?sl=' + lang + '&tl=' + targetlang + '&text=' + source + '&op=translate'
    print(url)
    r = s.get(url, headers=headers_Get)
    
    return r.text


def scanStr(text):
    tokenizedStr = []
    currWrd = ""
    for char in text:

        if (char != '<' and char != '>'):

            currWrd += char
        else:
            tokenizedStr.append(currWrd)
            currWrd = ""

    tokenizedStr.append(currWrd)

    return tokenizedStr

def findInd(path, tokenizedS):
    for i in range(len(tokenizedS)):
        #print(path, tokenizedS[i])
        if path in tokenizedS[i]:
            return i;

def strToFloatStr(strF):
    value = ""
    for char in strF:    
        if (char.isnumeric() or char == '.' or char == '-'):
            value += char
        elif (char != ','):
            return value;

    return value;


def getTranslation(lang, target, prompt):

    res = translateData(lang, target, prompt);
    tokenized = scanStr(res);

    ind = findInd('Fw(b) Fz(36px) Mb(-4px) D(ib)', tokenized)

    if (ind != None):
        return tokenized[ind:ind+11]

    try:
        f = open(extPath + "test.html", "w")
        f.write(res)
        f.close()
    except:
        print("Error with query")

def main():
    print(getTranslation("jp", "en", "猫が好き！"))
    return 0;

main();
