import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem.jsx';
import Message from './Message/Message.jsx'
import { Field, reduxForm } from 'redux-form';


const Dialogs = (props) => {
    let state = props.dialogsPage;
    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    let addNewMessage = (values) => {
        props.sendMessage(values.newMessageBody)
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                component='textarea'
                name='newMessageBody'
                placeholder='Enter your message' />
        </div>
        <div>
            <button>Send</button>
        </div>
    </form>
}

const AddMessageReduxForm = reduxForm({
    form: 'dialogsAddMessageForm',
})(AddMessageForm)

export default Dialogs;