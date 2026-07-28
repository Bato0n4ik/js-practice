const fs = require("fs/promises");
const http = require("http");
const path = require("path");

const PORT = 3001;

const mimeTypes = {
    ".jpg": "image/jpeg",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8"
};

const sourcePath = path.join(__dirname, '..', '..');

/**
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse} response
 */


const requestListener = async ( request,  response) => {

    let urlPath = request.url.substring(1).split("?")[0].trim();

    if (urlPath === "") {
        urlPath = "ajax-test.html";
    }

    let fileName = path.basename(urlPath);
    if(!path.extname(fileName)){
        fileName += ".html";
    }

    const fullPath = await findFile(sourcePath, fileName);

    if(fullPath){

        const extension = path.extname(fullPath);

        fs.readFile(fullPath)
            .then(data => {
                response.writeHead(200, mimeTypes[extension]);
                response.end(data);
            })
            .catch(err => {
                response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
                response.end(`Not Found, returned path is: ${fullPath}`);
            });
    }
};

http.createServer(requestListener).listen(PORT, () => console.log(`Server is started on port:${PORT}`));

async function findFile(currentDir, fileName){
    try{
        const entries = await fs.readdir(currentDir, {withFileTypes: true});

        for(const elem of entries){
            const fullPath = path.join(currentDir, elem.name);

            if(elem.isFile() && elem.name ===  fileName){
                return path.join(elem.parentPath, elem.name);
            }
            else if(elem.isDirectory()){
                const foundPath = await findFile(fullPath, fileName);
                if(foundPath){
                    return foundPath;
                }
            }
        }
    }
    catch(e){
        console.error(`Error:${e.message}`);
    }
}

/*
const fs = require("fs/promises");
const http = require("http");
const path = require("path");

const PORT = 3001;

const mimeTypes = {
    ".jpg": "image/jpeg",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8"
};

// Путь к папке 'src'
const sourcePath = path.join(__dirname, '..', '..');

const requestListener = async (request, response) => {
    // Получаем чистый относительный путь из URL
    let relativePath = request.url.split("?")[0].substring(1).trim();

    if (relativePath === "") {
        relativePath = "ajax-test.html";
    }

    let fullPath;

    // Проверяем, запрашивает ли клиент одну из страниц: home.html, contacts.html, about.html
    const pageFiles = ["home.html", "contacts.html", "about.html"];

    if (pageFiles.includes(relativePath)) {
        // Если да, перенаправляем запрос в подпапку 'js/ajax-practice/pages/'
        fullPath = path.join(sourcePath, 'js', 'ajax-practice', 'pages', relativePath);
    } else {
        // Для всех остальных файлов (ajax-test.html, client.js и т.д.) ищем от корня 'src'
        fullPath = path.join(sourcePath, relativePath);
    }

    try {
        const data = await fs.readFile(fullPath);
        const ext = path.extname(fullPath).toLowerCase();
        const contentType = mimeTypes[ext] || "application/octet-stream";

        response.writeHead(200, { "Content-Type": contentType });
        response.end(data);
    } catch (err) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end(`Файл не найден. Сервер искал по пути: ${fullPath}`);
    }
};

http.createServer(requestListener).listen(PORT, () => {
    console.log(`Сервер успешно перезапущен на http://localhost:${PORT}`);
});*/