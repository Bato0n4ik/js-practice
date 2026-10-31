const http = require("http");
const fs = require("fs");
const crypto = require('crypto');
const path = require("path");


let sessions = {
    "g3H801un6g854rTc": {age: 25, name: "Steve", id: 1}
}

const SECRET_KEY = crypto.scryptSync('super-secret-password', 'salt', 32);
const ALGORITHM = 'aes-256-cbc';

function encrypt(text) {
    const iv = crypto.randomBytes(16); // Вектор инициализации для случайности шифра
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Возвращаем IV вместе с шифром, чтобы потом расшифровать
    return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        return null; // Если токен подделан или поврежден
    }
}

async function readBytes(request, maxChunksSize = 1024 * 1024){
    let chunks = [];
    let chunksSize = 0;
    for await (const chunk of request) {
        chunksSize += chunk.length;
        if(chunksSize > maxChunksSize){
            throw new Error('Payload Too Large');
        }
        chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
}

http.createServer(async (request, response) =>{
    const url = request.url;
    const imageDir= path.join(__dirname, '..', '..', '..', 'img');

    const match = request.headers.cookie?.match(/session_token=([^;]+)/);
    const encryptedTokenValue = match? match[1]: null;

    if(url === "/users/login" && request.method === "POST"){
        const stringLoginData = await  readBytes(request);
        const loginDataObject = JSON.parse(stringLoginData);
        let isAuthenticated = false;

        for(let key of Object.keys(sessions)){
            if(sessions[key].age === loginDataObject.age && sessions[key].name === loginDataObject.name){
                isAuthenticated = true;
                break;
            }
        }

        if(isAuthenticated){
            createAndWriteCookie(response);
            return response.end(JSON.stringify({redirectUrl: '/create-or-update', success: true}));
        }

        response.statusCode = 401;
        response.end("Error 401: Unauthorized.");
    }



     if (url === `/users` && request.method === "POST") {
        try {
            let registeredUser = null;
            let newSessionId = '';

            if(encryptedTokenValue){
                registeredUser = sessions[`${decrypt(encryptedTokenValue)}`];
            }
            else{
                newSessionId =  generateId(16);
                sessions[newSessionId] = {age: null, name: ""};
                registeredUser = sessions[newSessionId];
            }
            const buffer = readBytes(request, 5*1024*1024);

            const exp = /Content-Disposition: form-data; name="([^"]+)"(?:; filename="([^"]+)")?\r\n(?:Content-Type: [^\r\n]+\r\n)?\r\n([\s\S]*?)(?=\r\n--)/g;
            const matches = [...buffer.matchAll(exp)];

            //response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

            if (matches.length > 0) {

                for (const match of matches) {
                    const name =  match[1];
                    const fileName = match[2];
                    const value = match[3];

                    if(fileName === undefined){
                        registeredUser[name] = value;
                        continue;
                    }

                    const fileBitsString = value.replace(/\s+/g, '');
                    const byteArr = [];
                    for(let i =0; i < fileBitsString.length; i += 8){
                        const chunk = fileBitsString.substring(i, i + 8);
                        byteArr.push(parseInt(chunk, 2));
                    }
                    const fileBytes = Buffer.from(byteArr);
                    const newFileName = `${Date.now()}_${fileName.substring(0, fileName.lastIndexOf("."))}_${generateId(5)}.jpg`;
                    fs.writeFileSync(path.join(imageDir, newFileName) , fileBytes);
                }

                if(encryptedTokenValue === null){
                    createAndWriteCookie(response, newSessionId);
                    //добавим сюда присваивание id блока, а сам id блока будем получать прибавлением к статической переменной
                    // или переменной записанную в sqlLite базу данных браузера, где будем её суммировать
                    return response.end(JSON.stringify({redirectUrl: '/create-or-update', success: true}));
                }

            } else {
                response.statusCode = 400;
                response.end("Error 400: form data not found or wrong format.");
            }
        } catch (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end(`Error 500: ${err.message}`);
        }
    }
     if(url === "/users/data" && request.method === "GET"){
         if(encryptedTokenValue){
             const registeredUser = sessions[`${decrypt(encryptedTokenValue)}`];
             response.statusCode = 200;
             return response.end(JSON.stringify(registeredUser));
         }
         response.statusCode = 401;
         response.end("Error 401: Unauthorized.");
     }
    if(url === "/users/avatar" && request.method === "GET"){

    }


}).listen(3000, () => console.log("Server started on http://localhost:3000"))

function generateId(length){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function createAndWriteCookie(response, id = generateId(16)){
    const cookieOptions = [
        `session_token=${encrypt(id)}`,
        'httpOnly',
        'sameSite=Strict',
        'Path=/'
    ].join(";");

    response.writeHead(200, {
        'Content-Type': 'application/json',
        'Set-Cookie': cookieOptions
    });
    response.statusCode = 200;
}

function getNewDivId(){
    if(Object.values(sessions).length > 0){
        return Math.max(...Object.values(sessions).map(obj => obj.id)) + 1;
    }
    return 1;
}


