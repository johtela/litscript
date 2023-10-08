import { css, html } from '../../../src/templates/html'
import { TemplateContext } from '../../../src/templates/template'

const styles = css`
.hamburger {
    --hamburger-offs: calc(var(--hamburger-size) * 1.4);
    --hamburger-width: calc(var(--hamburger-size) * 6);
    
    display: block;
    cursor: pointer;
}
.bar1, .bar2, .bar3 {
    width: var(--hamburger-width);
    height: var(--hamburger-size);
    background-color: currentColor;
    transition: transform var(--nav-transition);
}
.bar2 {
    margin: var(--hamburger-size) 0;
}
.hamburger.open .bar1 {
            transform: rotate(-45deg) translate(calc(0 - var(--hamburger-offs)), var(--hamburger-offs));
        }
.hamburger.open .bar2 {
    opacity: 0;
}
.hamburger.open .bar3 {
    transform: rotate(45deg) translate(calc(0 - var(--hamburger-offs)), calc(0 - var(--hamburger-offs)));
}`

export default (ctx: TemplateContext) => {
    ctx.require(__dirname, "./hamburger")
    ctx.style(styles)
    return html`
    <a class="hamburger">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </a>`
} 