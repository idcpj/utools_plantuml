import {EditorView, basicSetup, minimalSetup,} from "codemirror"
import { keymap} from "@codemirror/view"
import {indentWithTab,history} from "@codemirror/commands"
import {plantuml} from "./lib/lang";
import {javascript} from "@codemirror/lang-javascript";


const edit = document.querySelector("#edit");
const img = document.querySelector("#preview");
const tip = document.querySelector("#tip");


const doc = `@startuml
'https://plantuml.com/sequence-diagram

title:"登录时序图"

autonumber

participant client order 10
participant server order 30


client -> server: 登录


@enduml







`

let save_content='';

// 防抖函数处理内容变更
const debouncedContentChanged = debounce(() => {


    const content = view.state.doc.toString();
    if (save_content===content){
        return;
    }
    tip.innerHTML="渲染中..."
    img.src=''
    save_content=content
    render(content,(status,msg)=>{
        tip.innerHTML=msg
        img.src=msg;
        console.log(msg);
    })
}, 1000);

const view = new EditorView({
    doc,
    extensions: [
        plantuml,
        javascript(),
        history(),
        basicSetup,
        minimalSetup,
        EditorView.lineWrapping,
        keymap.of([indentWithTab]),
        EditorView.updateListener.of(debouncedContentChanged),
    ],
    parent:edit
})


function debounce(func, wait) {
    let timeout;
    return (...args) =>{
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}
window.onerror=(e)=>{
    alert(e)
}