import * as $ from "../../components/common";

$.each($.elementsWithClass($.hamburger), hamb =>
    $.toggleClassOnClick(hamb as HTMLElement, "open"));