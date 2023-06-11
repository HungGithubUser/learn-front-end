import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { POINTER_EVENTS_NONE_CSS_CLASS } from './constants.css.js';
library.add(faTrashCan);

export function getDeleteIcon() {
    let element = icon({ prefix: 'fas', iconName: 'trash-can' }).node[0];
    element.classList.add(POINTER_EVENTS_NONE_CSS_CLASS)
    return element;
}