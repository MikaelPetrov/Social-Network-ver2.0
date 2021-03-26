import { Field, reduxForm } from 'redux-form';
import { maxLengthThunkCreator, required } from '../../../utils/validators/validators';
import { TextArea } from '../../common/FormControl/FormControl';

const maxLength100 = maxLengthThunkCreator(100);

const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={TextArea}
                name='newMessageBody'
                placeholder='Enter your message'
                validate={[required, maxLength100]} />
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

export const AddMessageReduxForm = reduxForm({
    form: 'dialogsAddMessageForm'
})(AddMessageForm)