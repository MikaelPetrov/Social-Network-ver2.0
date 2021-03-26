const SEND_MESSAGE = 'social-network-ver1.0/dialogs/SEND_MESSAGE';

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
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return { ...state, messages: [...state.messages, { id: 4, message: body }] }
        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })

export default dialogsReducer