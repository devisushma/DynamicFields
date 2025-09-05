import Button from 'react-bootstrap/Button';
import AddFieldModal from './AddFieldModal';
import { setShowPopup } from './actions';
import { useSelector, useDispatch } from "react-redux";
import AddFormInputs from './AddFormInputs';


const DynFields = () => {

    const dispatch = useDispatch();
    const { showPopup, fields } = useSelector(state => state)
    const handleShowPopup = () => dispatch(setShowPopup());

    return (
        <div style={{ backgroundColor: '#aaa2a2ff', minHeight: '100vh', paddingBottom: '40px' }}>
            {showPopup &&
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >
                    <AddFieldModal />
                </div>
            }
            <Button variant="info" onClick={handleShowPopup} style={{ margin: "30px"}}>Add Field</Button>
            { fields.length > 0 && <AddFormInputs /> }
        </div>
    )
}

export default DynFields