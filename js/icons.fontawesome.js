import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CLICKABLE_FONT_AWESOME_ICON_CSS_CLASS } from './constants.css.js';
library.add(faTrashCan);

export function getDeleteIcon() {
    let svgElement = icon({ prefix: 'fas', iconName: 'trash-can', }).node[0];
    svgElement.classList.add(CLICKABLE_FONT_AWESOME_ICON_CSS_CLASS)
    return svgElement;
}