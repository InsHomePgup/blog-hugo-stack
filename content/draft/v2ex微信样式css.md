/* 顶栏 */
div#Top {
position: fixed;
width: 100%;
border-bottom: 0px;
backdrop-filter: blur(20px);
background-color: rgba(255, 255, 255, 0.4);
box-shadow: 0px 10px 10px 0px rgb(0 0 0 / 10%);
z-index: 9999;
}

div#Wrapper {
padding-top: 50px;
}

/* 对话框 */
.reply_content:before {
content: "";
width: 0px;
height: 0px;
border-top: 5px solid transparent;
border-bottom: 5px solid transparent;
border-right: 5px solid #ffffff;
position: absolute;
top: 5px;
left: -4px;
display: block;
}

.reply_content {
font-size: 14px;
line-height: 1.6;
color: var(--box-foreground-color);
word-break: break-word;
background-color: white;
border-radius: 4px;
padding: 7px;
position: relative;
width: fit-content;
}

.cell {
padding: 10px;
font-size: 14px;
line-height: 150%;
text-align: left;
border-bottom: 0px solid var(--box-border-color);
background-color: #F3F3F3;
}

/* .cell:hover {
background-color: #DEDEDE;
} */

/* 隐藏回复时间,回复按钮 */
.ago,
.fr {
/* opacity: 0; */
display: none;
}

/* 显示发布按钮 */
form+div>.fr {
display: inline;
}

/* 悬浮显示回复时间 */
.cell:hover .ago,.cell:hover .fr {
display: inline;
}


.cell .avatar {
width: 40px;
}


#Wrapper {
background-image: url(//res.wx.qq.com/t/wx_fed/webwx/res/static/img/2zrdI1g.jpg) !important;
background-size: cover;
}

.box {
border: 0px solid #e2e2ff !important;
background: #F3F3F3;
}

.topic_buttons {
padding: 5px;
font-size: 14px;
line-height: 120%;
border-top: 1px solid #d4d4d4;
text-align: left;
background: #e2e2e2;
}

.super.button {
background-image: none;
padding: 4px 15px 3px;
border: 1px solid rgba(80, 80, 90, .2);
border-bottom-color: rgba(80, 80, 90, .35);
border-radius: 3px;
font-size: 14px;
font-family: Arial, sans-serif;
display: inline-block;
line-height: 1.4;
outline: 0;
}

/* 头像栏黑色背景 */
#Rightbar > div:nth-child(2) > .cell {
background-color: #2e3238;
}

/* 发布页右边栏背景 */
.cell.topic_content.markdown_body {
background-color: #F3F3F3 !important;
}
/* #Rightbar>.box {
border: 0px;
background: #F3F3F3;
} */

#Rightbar>.cell span.bigger>a {
color: #ffffff;
font-size: 20px;
}

/* #member-activity + .cell {
background: #3a3f45;
} */

/* 账户余额链接 */
#member-activity+.cell a {
color: #bcb4b4;
text-shadow: 0 0 black;
}

.member-activity-start,.member-activity-half,.member-activity-almost,.member-activity-done {
background-color: #46c11b
}

#Main tr>td:nth-child(3)>strong>a {
font-weight: 200;
}


/* 回复数量 */
a.count_livid:active,
a.count_livid:link {
background-color: #E75E58;
}

a:hover {
text-decoration: none;
/* text-shadow: 0px 0px 1px rgb(102 112 106 / 74%);
transition: all 0.3s; */
}
a.topic-link:hover {
text-decoration: none;
}

.balance_area,
a.balance_area:link,
a.balance_area:visited {
border-radius: 4px;
background: none;
}

textarea#reply_content {
border: 0px;
background: transparent;
}

textarea#reply_content:active {
border: 0px;
}

.reply-box-sticky[stuck] {
border-top: 1px solid var(--box-border-color);
box-shadow: 0 3px 10px rgb(0 0 0 / 15%);
}

div#reply-box .cell:hover {
background: none;
}

#reply-box span.gray {
display: none;
}

#reply-box .cell.flex-row-end {
display: none;
}

#reply-box>div:nth-child(2) {
border-radius: 4px;
}

.self {display: flex;flex-direction: row-reverse;}

.self > td> strong {float: right;}

.self .reply_content{
background-color:rgb(169,233,122)
}

.self .reply_content:before {display: none;}

.self .reply_content:after {
content: "";
width: 0px;
height: 0px;
border-top: 5px solid transparent;
border-bottom: 5px solid transparent;
border-left: 5px solid rgb(169,233,122);
position: absolute;
top: 5px;
right: -4px;
display: block;
}

/* 详情页标题绿标 */
.header h1:before {border-left: 4px solid #00c250;padding-left: 10px;;content: "";}

.header h1 {font-size: 20px;font-weight: 500;}


input.normal.button,button.normal.button {
background: #00c250;
color: #FFF !important;
font-size: 14px;
font-weight:400;
text-shadow: none;
border:0px;
padding: 5px 20px;
}


input.normal.button:hover:enabled,button.normal.button:hover:enabled {
background: #58D78C;
color: #FFF !important;
font-size: 14px;
font-weight:400;
text-shadow: none;
border:0px;


}