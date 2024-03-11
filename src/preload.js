const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');


const bin = path.resolve(__dirname, 'bin/plantuml.jar');


const tempDir = os.tmpdir();

const uniqueFileName = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const new_bin = path.join(tempDir, `${uniqueFileName}.jar`);


const puml = path.join(tempDir, `${uniqueFileName}.puml`);
const png = path.join(tempDir, `${uniqueFileName}.png`);

const doc=`@startuml
'https://plantuml.com/sequence-diagram

title:"登录时序图"

autonumber

participant client order 10
participant server order 30


client -> server: 登录


@enduml






`

fs.copyFile(bin, new_bin, (err) => {
    if (err) {
        console.error(`Error moving file: ${err.message}`);
    } else {
        console.log(new_bin);
    }
});

window.render=(html)=> {

    fs.writeFile(puml, html, 'utf8', (err) => {
        if (err) {
            preview(false,`Error writing index.html: ${err}`)
        }
    })


    const command = `java -jar ${new_bin}  -charset UTF-8   ${puml}`;
    exec(command, { cwd: tempDir },(error, stdout, stderr) => {
        console.log(stdout);
        if (error) {
            preview(false,`exec error: ${error}`)
            return;
        }

        if (stderr) {
            preview(false,`stderr: ${stderr}`)
            return;
        }

        preview(true,png,html)

    });
}

utools.onPluginEnter(({code, type, payload, option}) => {
    console.log(type);
    console.log(payload.toString());
    if (type==='text' ){

        render(doc)
    }
    else if(type==='regex'){
        render(payload.toString())
    }else if(type==='files' ){
        if (payload.length>=0 && payload[0].isFile){
            fs.readFile(payload[0].path,(err,data)=>{
                if (err){
                    throw new Error(err)
                }
                console.log("fs.readFile ",payload[0].path);
                console.log(data);
                render(data.toString())
            })
        }
    }else{
        throw new Error(`type=${type} 类型不正确,只能是 text 或 file`)
    }

})

