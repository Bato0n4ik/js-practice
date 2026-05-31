const  http2 = require("http2");
const fs = require("fs");
const path = require("path")

const PORT = 3000;

const options = {
    cert: fs.readFileSync("server.crt"),
    key: fs.readFileSync("server.key")
};

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon'
};

const server = http2.createSecureServer(options);

server.on('request', (req, resp) =>{

    const cookieHeader = req.headers.cookie || "";
    const reqPath = decodeURIComponent(req.url.split('?')[0]);

    if(!cookieHeader.includes("session-id")){
        resp.setHeader("Set-Cookie",
            "session-id=123idqz; Path=/; Secure;  HttpOnly; SameSite=Strict");
    }

    if(reqPath === '/' && cookieHeader){
        let cookies = cookieHeader.split(/;\s*/).map(elem => elem.split("="));
        cookies.forEach(value => console.log(`key: ${value[0]}, value: ${value[1]}`));
    }

    //resp.setHeader("Content-Type", 'text/html; charset=utf-8');
    //resp.end(fs.readFileSync("src/index.html"));


    const srcFolder = path.join(__dirname, '..');

    let filePath;
    if (reqPath === '/') {
        filePath = path.join(srcFolder, 'index.html');
    } else {
        filePath = path.join(srcFolder, reqPath);
    }


    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // Если файл не найден, отдаем 404
            resp.statusCode = 404;
            resp.setHeader("Content-Type", "text/plain; charset=utf-8");
            resp.end("404 Файл не найден");
            return;
        }


        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        resp.statusCode = 200;
        resp.setHeader("Content-Type", contentType);

        // Отправляем файл браузеру
        fs.createReadStream(filePath).pipe(resp);
    });
});

server.listen(PORT, "localhost", () => console.log("Hello Server!"));
