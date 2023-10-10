import { html, css } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'

const styles = css`
.contentarea {
    --bordercolor: #EEE;
    --darkborder: #CCC;
    --radius: 4px;

    font-family: var(--cnt-font);
    font-size: var(--cnt-font-size);
    background-color: var(--cnt-bg-color);
    color: var(--cnt-color);
    line-height: 1.6em;
}
.contentarea a {
    color: #0645ad;
    text-decoration: none;
}
.contentarea a:visited {
    color: #0b0080;
}
.contentarea a:hover {
    color: #06e;
}
.contentarea a:active {
    color: #faa700;
}
.contentarea a:focus {
    outline: thin dotted;
}
.contentarea a:hover, 
.contentarea a:active {
    outline: 0;
}
.contentarea p {
    margin: 1em 0;
    -ms-hyphens: auto; 
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
}
.contentarea p code,
.contentarea ul code,
.contentarea ol code {
    color: darkred;
    background-color: #FEE;
    padding: 3px 4px;
    border-radius: var(--radius);
}
.contentarea img {
    max-width: 100%;
    float: right;
    margin: 0 0 1em 1em;
}
.contentarea h1, 
.contentarea h2, 
.contentarea h3, 
.contentarea h4, 
.contentarea h5, 
.contentarea h6 {
    font-family: var(--cnt-header-font);
    font-weight: normal;
    color: #111;
    line-height: 1em;
}
.contentarea h1 {
    margin: 1em 0;
    font-size: 36px;
    font-weight: 600;
    border-bottom: 0.1em var(--bordercolor) solid;
}
.contentarea h2 {
    font-size: 28px;
}
.contentarea h3 {
    font-size: 24px;
}
.contentarea h2, 
.contentarea h3 {
    margin: 1.5em 0 0 0;
    padding-bottom: 0.2em;
    border-bottom: 0.1em var(--bordercolor) solid;
}
.contentarea blockquote {
    font-style: italic;
    font-size: 17px;
    margin: 0 0 0 5%;
    text-align: justify;
    border-left: 5px solid var(--color-secondary);
    padding: 10px 25px 10px 35px;
    box-shadow: 4px 4px 15px #BBB;
    background-color: #FCF4F4;
    max-width: 90%;
}
.contentarea blockquote:before {
    display: block;
    padding-left: 10px;
    content: "“";
    font-size: 50px;
    position: relative;
    left: -40px;
    top: 20px;
    height: 0;
}
.contentarea hr {
    display: block;
    height: 2px;
    border: 0;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #eee;
    margin: 1em 0;
    padding: 0;
}
.contentarea code, 
.contentarea pre {
    font-family: var(--mono-font);
    font-size: var(--cnt-mono-font-size);
    line-height: 1.5em;
    tab-size: 4;
    hyphens: none;
}
.contentarea pre {
    background-color: var(--color-primary-light);
    padding: 1em;
    border-radius: var(--radius);
    overflow-x: auto;
    overflow-y: hidden;
}
.contentarea pre.console {
    background-color: black;
    color: lightgray;
}
.contentarea pre.console:before {
    content: '> ';
    color: darkgray;
}

.contentarea b, 
.contentarea strong {
    font-weight: bold;
}
.contentarea ins {
    background: #ff9;
    color: #000;
    text-decoration: none;
}
.contentarea mark {
    background: #ff0;
    color: #000;
    font-style: italic;
    font-weight: bold;
}
.contentarea sub, 
.contentarea sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}
.contentarea sup {
    top: -0.5em;
}
.contentarea sub {
    bottom: -0.25em;
}
.contentarea ul, 
.contentarea ol {
    margin: 1em 0;
    padding: 0 0 0 2em;
}
.contentarea p + ul, 
.contentarea p + ol {
    margin-top: -0.5em;
}
.contentarea li {
    padding-left: 0.5em;
}
.contentarea dd {
    margin: 0 0 0 2em;
}
.contentarea img {
    border: 0;
    -ms-interpolation-mode: bicubic;
    vertical-align: middle;
}
.contentarea table {
    border: 1px var(--darkborder) solid;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
}
.contentarea tbody tr:nth-child(odd) {
    background-color: #f2f2f2;
}
.contentarea th, 
.contentarea td {
    padding: 0.5em;
    border-right: 1px var(--darkborder) solid;
}
.contentarea th {
    background-color: #DDD;
}
.contentarea td {
    vertical-align: top;
}
.contentarea svg {
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.contentarea summary {
    font-family: var(--cnt-header-font);
    font-weight: normal;
    color: #888;
    cursor: pointer;
}
.contentarea summary:focus {
    outline: none;
}
.contentarea summary:hover {
    color: var(--cnt-color);
}
.contentarea details {
    padding: 0px 8px;
    border: #AAA dashed 1px;
    border-radius: var(--radius);
    max-height: 2em;
    overflow: auto;
    transition: 2s;
}
.contentarea details[open] {
    max-height: 95vh;
}
.contentarea .alert {
    font-family: var(--sans-font);
    font-weight: 600;
    display: flex;
    align-items: center;
    border-radius: var(--radius);
    padding: 1em;
    background-color: var(--bgColor, #f8d7da);
    color: var(--textColor, #721c24);
}
.contentarea .alert::before {
    content: var(--icon);
    font-size: 24px;
    margin-right: 0.5em;
}
.contentarea .alert.error {
    --bgColor: #f8d7da;
    --textColor: #721c24;
    --icon: "⛔";
}
.contentarea .alert.warning {
    --bgColor: #fff3cd;
    --textColor: #856404;
    --icon: "⚠️";
}
.contentarea .alert.info {
    --bgColor: #d1ecf1;
    --textColor: #0c5460;
    --icon: "ℹ️";
}
.contentarea .alert.success {
    --bgColor: #d4edda;
    --textColor: #155724;
    --icon: "✅";
}`

export default (ctx: TemplateContext) => {
    ctx.style(styles)
    return html`
        <div class="contentarea closepopups">
            ${ctx.contents}
        </div>`
}