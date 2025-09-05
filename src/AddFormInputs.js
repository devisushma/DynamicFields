import { useSelector, useDispatch } from 'react-redux';
import { setFieldValues, setRestForm } from './actions';
import { Form, Col, Button } from 'react-bootstrap';
import { checkboxField, dropdownField, passwordField } from './constants';
import { useEffect } from 'react';

const AddFormInputs = () => {
    const { fields } = useSelector(state => state);
    const dispatch = useDispatch();

     useEffect(() => {
        localStorage.setItem('fields', JSON.stringify(fields));
    }, [fields]);

    const handleTextChange = (e, field) => {
        const updatedField = { ...field, value: e.target.value };
        dispatch(setFieldValues(updatedField))
    }

    const handleSubmitClick = (e) => {
         e.preventDefault(); 
        const form = e.currentTarget;
        if (form.checkValidity()) {
            const fieldValues = fields.map(field => ({
            label: field.fieldText,
            value: field.value
        }));
        const message = fieldValues.map(f => `${f.label}: ${f.value}`).join('\n');
            alert(`Form submitted successfully!'\n\n${message}`);
        }
        handleResetForm();
    }

    const handleResetForm = () => {
        localStorage.setItem('fields', JSON.stringify([]));
        dispatch(setRestForm());
    }

    return (
        <Form style={{ width: '60%', margin: '20px auto', border: '1px solid #433d3dff', padding: '20px', borderRadius: '5px' }}
            onSubmit={handleSubmitClick}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                {fields.map((field) => {
                    const isPasswordText = field.fieldText === passwordField;
                    const fieldStyle = { width: field.width || '100%' };
                    if (field.fieldText === checkboxField) {
                        return (
                            <div className="mb-3" style={{ ...fieldStyle, display: 'flex', alignItems: 'center' }}>

                                {field.options.map((option) => (
                                    <Form.Check
                                        inline
                                        label={option}
                                        onChange={(e) => handleTextChange(e, field)}
                                    />
                                ))}
                            </div>
                        )
                    }
                    else if (field.fieldText === dropdownField) {
                        return (
                            <div style={fieldStyle}>
                                <Form.Group>
                                    <Form.Label>{field.fieldText}</Form.Label>
                                    <Form.Select defaultValue="" onChange={(e) => handleTextChange(e, field)}>
                                        <option value="">Choose option</option>
                                        {field.options.map((option) => (
                                            <option>{option}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div style={fieldStyle}>
                                <Form.Group className="mb-3">
                                    <Form.Label>{field.fieldText}</Form.Label>
                                    <Form.Control
                                        type={isPasswordText ? "password" : "text"}
                                        placeholder={isPasswordText ? "Enter Password" : "Enter Text"}
                                        required={isPasswordText}
                                        onChange={(e) => handleTextChange(e, field)}
                                    />
                                </Form.Group>
                            </div>
                        )
                    }
                })}
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
                <Button variant="primary" type="submit" style={{ width: '100%' }} onClick={handleResetForm}>
                    Cancel
                </Button>
            </div>
        </Form >
    )
}

export default AddFormInputs;