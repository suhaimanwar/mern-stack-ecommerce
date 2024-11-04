import path from "path"


export const getFilePath = (file) =>{ 

    console.log('file::',file)
    console.log('filepath::',file.path)
    console.log('path::',path)
    console.log('pathsep::',path.sep)

    
    
    return 'uploads' + file.path.split(path.sep + "uploads").at(1)

}