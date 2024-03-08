plantuml.jar  -charset UTF-8   login.puml


```
@startuml
'https://plantuml.com/sequence-diagram

title:"登录时序图"

autonumber


participant client order 10
participant server order 30


client -> server: 登录(0x008)
return
|||
client -> server: 订阅最近联系人用户在线状态(0x0300)
return
server -> client : 获取组织和好友所有用户通知(0x330)[无用]
server -> client : 批量用户状态通知(0x331)
server -> client : 在线状态通知(0322)
server -> client : 群消息通知(0x0324)


@enduml
```

```
@startmindmap
- asd
- - asd
- - - asd
- - - - asd
- - - - - asd
- - - - - - asd
- - - - - - - asd- - - - - - - asd
- - - - - - - asd- - - - - - - asd
- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - -- - - - - - - asd- - - - - - - asd
- - - - - - - asd
@endmindmap
```