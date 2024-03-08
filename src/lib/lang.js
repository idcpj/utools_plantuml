import {javascriptLanguage} from "@codemirror/lang-javascript";

const keywords=[
'@endboard',
'@endbpm',
'@endcreole',
'@endcute',
'@enddef',
'@endditaa',
'@enddot',
'@endflow',
'@endgantt',
'@endgit',
'@endjcckit',
'@endjson',
'@endlatex',
'@endmath',
'@endmindmap',
'@endnwdiag',
'@endproject',
'@endsalt',
'@endtree',
'@enduml',
'@endwbs',
'@endwire',
'@endyaml',
'@startboard',
'@startbpm',
'@startcreole',
'@startcute',
'@startdef',
'@startditaa',
'@startdot',
'@startflow',
'@startgantt',
'@startgit',
'@startjcckit',
'@startjson',
'@startlatex',
'@startmath',
'@startmindmap',
'@startnwdiag',
'@startproject',
'@startsalt',
'@starttree',
'@startuml',
'@startwbs',
'@startwire',
'@startyaml',
'actor',
'boundary',
'control',
'entity',
'database',
'collections',
'queue',
'participant',
'as',
'autonumber',
'autonumber stop',
'newpage',
'group',
'note left',
'note right',
'end note',
'note across:',
'|||',
'return',

]

const tmp_list=[
    {
        label: "@startuml",
        type: "text",
        apply: `@startuml
title:"标题"

autonumber

participant Alice order 10
participant Bob order 30

Alice -> Bob: Authentication Request
Bob --> Alice: Authentication Response

Alice -> Bob: Another authentication Request
Alice <-- Bob: Another authentication Response
@enduml`,
        detail: "startuml"
    },
    {
        label: "@startmindmap",
        type: "text",
        apply: `@startmindmap
+ OS
++ Ubuntu
+++ Linux Mint
+++ Kubuntu
+++ Lubuntu
+++ KDE Neon
++ LMDE
++ SolydXK
++ SteamOS
++ Raspbian
-- Windows 95
-- Windows 98
-- Windows NT
--- Windows 8
--- Windows 10
@endmindmap
`,
        detail: "startmindmap"
    },
]


function myCompletions(context) {
    let word = context.matchBefore(/\w*/)
    // console.log(word);
    if (word.from === word.to && !context.explicit)
        return null

    return {
        from: word.from,
        options: [
            ...keywords.map((item)=>{
                return {label: item, text: "text",apply:item}
            }),
            ...tmp_list,
        ]
            // [
            // {label: "match", type: "keyword"},
            // {label: "hello", type: "variable", info: "(World)"},
            // {label: "magic", type: "text", apply: "⠁⭒*.✩.*⭒⠁", detail: "macro"}
        // ]
    }
}


export  const plantuml = javascriptLanguage.data.of({
    autocomplete: myCompletions,
    languageData: {
        commentTokens: {line: "'"}
    }
})


