import { DialogType, MessageType } from './../types/types';

const SEND_MESSAGE = 'social-network-ver2.0/dialogs/SEND_MESSAGE'

//  dialogsInitialState and dialogsReducer
type DialogsInitialStateType = typeof dialogsInitialState

let dialogsInitialState = {
    dialogs: [
        { id: 1, name: 'Alexey' },
        { id: 2, name: 'Maria' },
        { id: 3, name: 'Sasha' },
        { id: 4, name: 'Yasha' },
        { id: 5, name: 'Dima' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'What you doing?' },
        { id: 3, message: 'It\'s very interesting' }
    ] as Array<MessageType>
}

const dialogsReducer = (state = dialogsInitialState, action: any): DialogsInitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return { ...state, messages: [...state.messages, { id: 4, message: body }] }
        default:
            return state
    }
}

//  sendMessageAction
type SendMessageActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
export const sendMessageAction = (newMessageBody: string): SendMessageActionType => ({ type: SEND_MESSAGE, newMessageBody })

//  export default
export default dialogsReducer
