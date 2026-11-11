/*export*/ import fs from "fs/promises";
import path from "path";


const documentPrintObject = (object) =>{
    let newDiv = document.createElement('div');
    let genId = generateId(16);
    newDiv.textContent = object;
    newDiv.setAttribute("id", genId);
    if (document.body) {
        document.body.appendChild(newDiv);
    } else {
        window.onload = () => document.body.appendChild(newDiv);
    }
    return genId;
}

function generateId(length){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for(let i = 0; i < length; i++){
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function findFile(currentDir, fileName){
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