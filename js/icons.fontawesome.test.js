import { POINTER_EVENTS_NONE_CSS_CLASS } from './constants.css'
import { getDeleteIcon } from './icons.fontawesome'

test('Should get trash icon successfully', () => {
    expect(getDeleteIcon()).toBeTruthy()
    expect(getDeleteIcon()).toBeInstanceOf(Element)
    expect(getDeleteIcon().classList).toContain(POINTER_EVENTS_NONE_CSS_CLASS)
})