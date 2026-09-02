const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer(async (request, response) => {
    const url = request.url;


    if (url === "/" || url === "/form-page.html") {

        const filePath = path.join(__dirname, "..", "..", "form-page.html");
        fs.readFile(filePath, (err, content) => {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                return response.end(`Error page loading: ${err.message}`);
            }
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.end(content);
        });
    }


    else if (url.endsWith(".css") || url.endsWith(".js")) {

        const filePath = path.join(__dirname, "..", "..", url);

        fs.readFile(filePath, (err, content) => {
            if (err) {
                response.writeHead(404, { "Content-Type": "text/plain" });
                return response.end("File not found");
            }

            const contentType = url.endsWith(".css") ? "text/css" : "application/javascript";
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content);
        });
    }


    else if (url === "/user" && request.method === "POST") {
        try {
            let chunks = [];
            for await (const chunk of request) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks).toString('utf-8');

            const exp = /Content-Disposition: form-data; name="([^"]+)"\r\n\r\n([\s\S]*?)(?=\r\n--)/g;
            const matches = [...buffer.matchAll(exp)];

            response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

            if (matches.length > 0) {
                let resultText = "";
                for (const match of matches) {
                    resultText += `name: ${match[1]}, value: ${match[2].trim()}\r\n`;
                }
                response.end(resultText);
            } else {
                response.statusCode = 400;
                response.end("Error 400: form data not found or wrong format.");
            }
        } catch (err) {
            response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.end(`Error 500: ${err.message}`);
        }
    }

    else {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end(`Error 404: route "${url}" doesn't exist on this server.`);
    }

}).listen(3002, () => console.log("Server started on http://localhost:3002"));