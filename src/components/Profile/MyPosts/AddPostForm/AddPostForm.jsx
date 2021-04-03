import { Field, reduxForm } from 'redux-form';
import { maxLengthThunk, required } from '../../../../utils/validators/validators';
import { TextArea } from '../../../common/FormControl/FormControl';

const maxLengthText = maxLengthThunk(30);

const AddNewPostForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component={TextArea} name='newPostText' placeholder='Enter your post' validate={[required, maxLengthText]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

export const AddNewPostReduxForm = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm)
