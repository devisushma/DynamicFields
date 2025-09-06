import { setShowPopup, setSelectedOption, fieldObj, setAddFields } from './actions';
import { Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fieldTypes, shortTextField, longTextField, passwordField, dropdownField, checkboxField } from './constants';

const AddFieldModal = ({ }) => {
    const options = fieldTypes
    const dispatch = useDispatch();
    const handleCloseModal = () => dispatch(setShowPopup());
    const  { showPopup } = useSelector(state => state);

    const handleSelectChange = e => {
        dispatch(setSelectedOption(e.target.value));
        if (e.target.value === "1") {
            dispatch(setAddFields({
                ...fieldObj,
                fieldTypeId: e.target.value,
                fieldText: shortTextField,
                required: false,
                width: '30%'
            }))
        }
        else if (e.target.value === "2") {
            dispatch(setAddFields({
                ...fieldObj,
                fieldTypeId: e.target.value,
                fieldText: longTextField,
                required: false,
                width: '50%'
            }))
        }
        else if (e.target.value === "3") {
            dispatch(setAddFields({
                ...fieldObj,
                fieldTypeId: e.target.value,
                fieldText: passwordField,
                required: true
            }))
        }
        else if (e.target.value === "4") {
            dispatch(setAddFields({
                ...fieldObj,
                fieldTypeId: e.target.value,
                fieldText: dropdownField,
                options: ['option 1', 'option 2', 'option 3'],
                required: false
            }))
        }
        else if (e.target.value === "5") {
            dispatch(setAddFields({
                ...fieldObj,
                fieldTypeId: e.target.value,
                fieldText: checkboxField,
                options: ['choice1', 'choice2'],
                required: false
            }))
        }
    }

    return (
        <Modal show={showPopup} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Add Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select onChange={handleSelectChange} defaultValue="" style={{ border: '2px solid #0d6efd' }} >
                    <option value="" disabled>Select field type</option>
                    {options.map(item => <option value={item.id}>{item.name}</option>)}
                </Form.Select>
            </Modal.Body>
        </Modal>
    )
}

export default AddFieldModal;