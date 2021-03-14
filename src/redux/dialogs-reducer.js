const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

let initialState = {
    dialogs: [
        { id: 1, name: 'Alexey' },
        { id: 2, name: 'Maria' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Yasha' },
        { id: 5, name: 'Dima' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'What you doing?' },
        { id: 3, message: 'It\'s very interesting' }
    ],
    newMessageBody: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            return {
                ...state,
                newMessageBody: '',
                messages: [...state.messages, { id: 4, message: body }]
            }
        case UPDATE_NEW_MESSAGE_BODY:
            return {
                ...state,
                newMessageBody: action.body
            }
        default:
            return state;

    }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;