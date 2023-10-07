import { html, css } from 'templates/html'

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
    content: "\201C";
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

    code, pre {
        font-family: @mono-font;
        font-size: @cnt-mono-font-size;
        line-height: 1.5em;
        tab-size: 4;
        hyphens: none;
    }
    pre {
        background-color: @color-primary-light;
        padding: 1em;
        border-radius: @radius;
        overflow-x: auto;
        overflow-y: hidden;
        .thin-scrollbars();
        &.console {
            &:before {
                content: '> ';
                color: darkgray;
            }
            background-color: black;
            color: lightgray;
        }
    }

    b, strong {
        font-weight: bold;
    }

    ins {
        background: #ff9;
        color: #000;
        text-decoration: none;
    }

    mark {
        background: #ff0;
        color: #000;
        font-style: italic;
        font-weight: bold;
    }

    sub, sup {
        font-size: 75%;
        line-height: 0;
        position: relative;
        vertical-align: baseline;
    }

    sup {
        top: -0.5em;
    }

    sub {
        bottom: -0.25em;
    }

    ul, ol {
        margin: 1em 0;
        padding: 0 0 0 2em;
    }

    p + ul, p + ol {
        margin-top: -0.5em;
    }

    li {
        padding-left: 0.5em;
    }

    dd {
        margin: 0 0 0 2em;
    }

    img {
        border: 0;
        -ms-interpolation-mode: bicubic;
        vertical-align: middle;
    }

    table {
        border: 1px @darkborder solid;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
        overflow: auto;
    }

    tbody tr:nth-child(odd) {
        background-color: #f2f2f2;
    }

    th, td {
        padding: 0.5em;
        border-right: 1px @darkborder solid;
    }

    th {
        background-color: #DDD;
    }

    td {
        vertical-align: top;
    }

    svg {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    summary {
        font-family: @cnt-header-font;
        font-weight: normal;
        color: #888;
        cursor: pointer;
        &:focus {
            outline: none;
        }
        &:hover {
            color: @cnt-color;
        }
    }
    details {
        padding: 0px 8px;
        border: #AAA dashed 1px;
        border-radius: @radius;
        max-height: 2em;
        overflow: auto;
        .thin-scrollbars();
        transition: 2s;
    }
    details[open] {
        max-height: 95vh;
    }

    .alert(@bgColor, @textColor, @icon) {
        font-family: @sans-font;
        font-weight: 600;
        display: flex;
        align-items: center;
        border-radius: @radius;
        padding: 1em;
        background-color: @bgColor;
        color: @textColor;
        &::before {
            content: url(@icon);
            width: 2em;
            height: 2em;
            margin-right: 0.5em;
        }
    }
    .error {
        .alert(#f8d7da, #721c24, './exclamation-circle.svg');
    }
    .warning {
        .alert(#fff3cd, #856404, './exclamation-triangle.svg');
    }
    .info {
        .alert(#d1ecf1, #0c5460, './info-circle.svg');
    }
    .success {
        .alert(#d4edda, #155724, './check-circle.svg');
    }
}`