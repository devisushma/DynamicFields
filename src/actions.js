import { type } from "@testing-library/user-event/dist/type";
import { useReducer } from "react";

export const showPopup = 'SHOW_POPUP';
export const selectedOption = 'SELECTED_OPTION';
export const addFields = 'ADD_FIELD';
export const fieldValues = 'FIELD_VALUES';
export const resetForm = 'RESET_FORM';

export const setShowPopup = () => ({
    type: showPopup
})

export const setSelectedOption = (option) => ({
    type: selectedOption,
    payload: option
})

export const setAddFields = (field) => ({
    type: addFields,
    payload: field
})

export const setFieldValues = (updatedField) => ({
    type: fieldValues,
    payload: updatedField
})

export const setRestForm = () => ({
    type: resetForm
})

export const fieldObj = {
    fieldTypeId: '',
    fieldText: '',
    options: [],
    width: '',
    required: false,
    value: ""
}

const savedFields = JSON.parse(localStorage.getItem('fields') || []);
const initialState = { showPopup: false, fields: savedFields, selectedOption: "" };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case showPopup:
            return { ...state, showPopup: !state.showPopup };
        case selectedOption:
            return { ...state, selectedOption: action.payload, showPopup: false };
        case addFields:
            return { ...state, fields: state.fields.concat(action.payload) };
        case fieldValues:
            const updatedFields = state.fields.map(field =>
                field.fieldTypeId === action.payload.fieldTypeId ? action.payload : field
            );
            return { ...state, fields: updatedFields };
        case resetForm:
            return {
                ...state,
                fields: []
            };
        default:    
            return state;
    }
}


export default reducer;

