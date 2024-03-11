import {EditorView, basicSetup, minimalSetup,} from "codemirror"
import { keymap} from "@codemirror/view"
import {indentWithTab,history} from "@codemirror/commands"
import {plantuml} from "./lib/lang";
import {javascript} from "@codemirror/lang-javascript";


const edit = document.querySelector("#edit");
const img = document.querySelector("#preview");
const tip = document.querySelector("#tip");


let doc = `






`

let save_content='';

window.preview=(status,msg,content=null)=>{

    if (content){

        doc=content
        save_content=content
        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: content, // 设置新的内容
            },
        });
    }

    if (!status){
        tip.innerHTML=msg
    }else{
        tip.innerHTML=''
    }
    img.src=msg+'?timestamp=' + Date.now();
    console.log(msg);
}


// 防抖函数处理内容变更
const debouncedContentChanged = debounce(() => {


    const content = view.state.doc.toString();
    if (save_content===content){
        return;
    }
    tip.innerHTML="渲染中..."
    img.src=''
    save_content=content
    render(content);

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