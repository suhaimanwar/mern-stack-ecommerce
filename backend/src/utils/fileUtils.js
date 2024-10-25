//Will create a path for storing images and files which are uploaded

import { mkdirSync } from "fs"
import { join } from "path";
import { cwd } from "process";


export const getUploadDir = (filePath) => {
    const dir = join(cwd(), `/uploads/${filePath}/`) //specifying the directory here 

    if(!existsSync(dir)){
        mkdirSync(dir, {recursive: true}); //If directory doesn't exist, It will creative 
    }
    return dir;
};

export const getRootDir = () =>{
    return cwd()
}