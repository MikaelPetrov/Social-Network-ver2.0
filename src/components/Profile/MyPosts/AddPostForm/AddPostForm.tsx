import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthThunk, required } from '../../../../utils/validators/validators';
import { createField, GetStringKeys, Input } from '../../../common/FormControl/FormControl';

type PropsType = {}
export type NewPostFormValuesType = {
    newPostText: string
}
type NewPostFormKeysType = GetStringKeys<NewPostFormValuesType>

const maxLengthText = maxLengthThunk(60)

const AddNewPostForm: React.FC<InjectedFormProps<NewPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            {createField<NewPostFormKeysType>('Your new post', 'newPostText', Input, [required, maxLengthText])}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const AddNewPostReduxForm = reduxForm<NewPostFormValuesType>({ form: 'profileAddNewPostForm' })(AddNewPostForm)
export default AddNewPostReduxForm
