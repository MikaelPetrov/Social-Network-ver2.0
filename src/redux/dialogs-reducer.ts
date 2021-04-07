import { InferActionsTypes } from './redux-store';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}

//  dialogsInitialState and dialogsReducer
const dialogsInitialState = {
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

const dialogsReducer = (state = dialogsInitialState, action: ActionsType): DialogsInitialStateType => {
    switch (action.type) {
        case 'social-network-ver2.0/dialogs/SEND_MESSAGE':
            let body = action.newMessageBody;
            return { ...state, messages: [...state.messages, { id: 4, message: body }] }
        default:
            return state
    }
}

//  actions
export const actions = {
    sendMessageAction: (newMessageBody: string) => ({ type: 'social-network-ver2.0/dialogs/SEND_MESSAGE', newMessageBody } as const)
}

export type DialogsInitialStateType = typeof dialogsInitialState
type ActionsType = InferActionsTypes<typeof actions>

//  export default
export default dialogsReducer
