import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello, world!', likesCount: 0 },
                { id: 2, message: 'It\'s wonderful day', likesCount: 21 }
            ],
            newPostText: ''
        },
        dialogsPage: {
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
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer; // observer
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
}

export default store;
window.store = store;
// store - OOP