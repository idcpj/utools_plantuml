const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');


const bin = path.resolve(__dirname, 'bin/plantuml.jar');

const uniqueFileName = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const puml = path.resolve(tempDir, `${uniqueFileName}.puml`);

// const tempDir = os.tmpdir();
// const puml = path.join(tempDir, `${uniqueFileName}.puml`);
// const png = path.join(tempDir, `${uniqueFileName}.png`);

try {



    window.render=(html,callback)=> {


        html=cleanHTML(html)

        fs.writeFile(puml, html, 'utf8', (err) => {
            if (err) {
                callback(false,`Error writing index.html: ${err}`)
            }
        });


        const command = `${bin}  -charset UTF-8   ${puml}`;
        exec(command, { cwd: tempDir },(error, stdout, stderr) => {
            console.log(stdout);
            if (error) {
                callback(false,`exec error: ${error}`)
                return;
            }

            if (stderr) {
                callback(false,`stderr: ${stderr}`)
                return;
            }

            callback(true,png)

        });
    }


    function cleanHTML(html) {
        // 将 `<br>` 转换为 `\n`。
        html = html.replace(/<br ?\/?>/g, '\n');

        // 过滤掉所有 HTML 标签。
        html = html.replace(/<.*?>/g, '');
        html = html.replace(/&gt;/g, '>');
        html = html.replace(/&lt;/g, '<');

        return html;
    }

}catch (e){
    alert(e)
}