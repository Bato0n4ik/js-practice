import {findFile} from "../UtilityClass.js";
import http from "node:http";
import path from "node:path";
import crypto from "node:crypto";
import fs from "node:fs/promises";


const httpStatusMap = {
    ENOENT: 404, // File not found
    EACCES: 403, // access denied
    EISDIR: 400, // This is a folder, not a file
};

const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
};


let sessions = {
    "g3H801un6g854rTc": {age: 25, name: "Steve", id: 'div-1234'}
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
    return Buffer.concat(chunks);
}

http.createServer(async (request, response) =>{
    const url = request.url;
    const imageDir= path.join(import.meta.dirname, '..', '..', '..', 'img');

    const match = request.headers.cookie?.match(/session_token=([^;]+)/);
    let encryptedTokenValue = match? match[1]: null;

    const projectDir= path.join(import.meta.dirname, '..', '..', '..');

    if(!url.startsWith("/api/")){
        let ext = path.extname(url);
        let acceptType = "";

        if(!ext){
            acceptType = request.headers['accept'].split(",")[0];
            ext = Object.entries(mimeTypes).filter(([k, v]) => v === acceptType).map(([k,v]) => k)[0];
        }
        else{
            acceptType = mimeTypes[ext];
        }

        try{
            let fullPath = await findFile(projectDir, url);
            let data = await fs.readFile(fullPath);
            response.writeHead(200, {"Content-type": acceptType});
            return response.end(data);

        }catch(err){
            let code = httpStatusMap[err.code] || 500;
            response.writeHead(code, {"Content-type": "text/plain"});
            return response.end(`Error: ${err.message}`);
        }
    }

    if(url === "/api/users/login" && request.method === "POST"){
        const bufferBody = await  readBytes(request);
        const loginDataObject = JSON.parse(bufferBody.toString("utf-8"));
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
        return response.end("Error 401: Unauthorized.");
    }



     if (url === `/api/users` && request.method === "POST") {
        try {
            let registeredUser = null;
            let newSessionId = '';
            const decryptedToken = encryptedTokenValue ? decrypt(encryptedTokenValue) : null;

            if(encryptedTokenValue && sessions[decryptedToken]){
                registeredUser = sessions[`${decrypt(encryptedTokenValue)}`];
            }
            else{
                newSessionId =  generateId(16);
                sessions[newSessionId] = {age: null, name: "", id: "", avatarName: ""};
                registeredUser = sessions[newSessionId];
                encryptedTokenValue = null;
            }
            const buffer = await readBytes(request, 5*1024*1024);
            const bufferString = buffer.toString("binary");

            const exp = /Content-Disposition: form-data; name="([^"]+)"(?:; filename="([^"]+)")?\r\n(?:Content-Type: [^\r\n]+\r\n)?\r\n([\s\S]*?)(?=\r\n--)/g;
            const matches = [...bufferString.matchAll(exp)];

            if (matches.length > 0) {

                for (const match of matches) {
                    const name =  match[1];
                    const fileName = match[2];
                    const value = match[3];

                    if(fileName === undefined){
                        //must be validation here, if validation fail, then throw error and clear user session data
                        // on empty or  write this data in buffer first and after success validation write it in session
                        registeredUser[name] = Buffer.from(value, 'binary').toString('utf-8');
                        continue;
                    }

                    const fileBytes = Buffer.from(value, "binary");

                    const magicBites = fileBytes.subarray(0, 4).toString('hex');
                    let ext = '';
                    if(magicBites.startsWith('89504e47')){
                        ext = 'png';
                    }
                    else if(magicBites.startsWith('ffd8ff')){
                        ext = 'jpg';
                    }

                    const newFileName = `${Date.now()}_user_${generateId(10)}.${ext}`;

                    if(fileBytes.length >= 100){

                        await fs.mkdir(imageDir, { recursive: true });
                        await fs.writeFile(path.join(imageDir, newFileName) , fileBytes);
                        registeredUser.avatarName = newFileName;
                    }
                    else{
                        response.writeHead(400, { 'Content-Type': 'text/plain' });
                        return response.end('Invalid or corrupted image file');
                    }
                }

                if(encryptedTokenValue === null){
                    createAndWriteCookie(response, newSessionId);
                    registeredUser.id = `div-${crypto.randomUUID()}`;
                }
                response.writeHead(200, { 'Content-Type': 'application/json' });
                return response.end(JSON.stringify({redirectUrl: '/create-or-update', success: true}));

            } else {
                response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
                response.end("Error 400: form data not found or wrong format.");
            }
        } catch (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end(`Error 500: ${err.message}`);
        }
    }
     if(url === "/api/users/data" && request.method === "GET"){
         if(encryptedTokenValue){
             const registeredUser = sessions[`${decrypt(encryptedTokenValue)}`];
             response.statusCode = 200;
             return response.end(JSON.stringify({age: registeredUser["age"], name: registeredUser["name"] , id: registeredUser["id"]}));
         }
         response.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' });
         return response.end("Error 401: Unauthorized.");
     }
    if(url === "/api/users/avatar" && request.method === "GET"){

        if(encryptedTokenValue){

            const registeredUser = sessions[`${decrypt(encryptedTokenValue)}`];
            const ext = path.extname(registeredUser.avatarName);

            try{
                const data = await fs.readFile(path.join(imageDir, registeredUser.avatarName));
                response.writeHead(200, {"Content-Type" : mimeTypes[ext]});
                response.end(data)
            }catch(err){
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                return response.end('Image not found');
            }
        }
        else{
            response.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' });
            return response.end("Error 401: Unauthorized.");
        }
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
}