import "./tocmenu.less"
import * as $ from "../../components/common/myquery"
import { initAccordions } from "../../components/common/accordion"

let tocmenu = $.elementsWithStyle("tocmenu")[0] as HTMLElement
if (tocmenu) {
    if (!document.fonts || document.fonts.status == "loaded")
        initAccordions(tocmenu)
    else
        document.fonts.onloadingdone = () => initAccordions(tocmenu)
}