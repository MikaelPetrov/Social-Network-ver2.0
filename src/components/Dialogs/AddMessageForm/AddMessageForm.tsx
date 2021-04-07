import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthThunk, required } from '../../../utils/validators/validators';
import { createField, GetStringKeys, TextArea } from '../../common/FormControl/FormControl';

type PropsType = {}
export type NewMessageFormValuesType = {
    newMessageBody: string
}
type NewMessageFormKeysType = GetStringKeys<NewMessageFormValuesType>

const maxLengthText = maxLengthThunk(200)

const AddNewMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<NewMessageFormKeysType>('Enter your message', 'newMessageBody', TextArea, [required, maxLengthText])}
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

const AddNewMessageReduxForm = reduxForm<NewMessageFormValuesType>({ form: 'dialogsAddMessageForm' })(AddNewMessageForm)
export default AddNewMessageReduxForm
