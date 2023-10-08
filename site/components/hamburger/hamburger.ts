import * as $ from "../../components/common";

$.each($.elementsWithStyle($.hamburger), hamb =>
    $.toggleClassOnClick(hamb as HTMLElement, "open"));