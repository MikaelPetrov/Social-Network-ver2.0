import { InferActionsTypes } from './redux-store';
import { getAuthMeThunk } from './auth-reducer';

//  appInitialState and appReducer
const appInitialState = {
    initialized: false
}

const appReducer = (state = appInitialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'social-network-ver2.0/app/INITIALIZED_SUCCESS':
            return { ...state, initialized: true }
        default:
            return state
    }
}

//  actions
export const actions = {
    initializedSuccessAction: () => ({ type: 'social-network-ver2.0/app/INITIALIZED_SUCCESS' } as const)
}

//  initializeAppThunk
export const initializeAppThunk = () => (dispatch: any) => {

    let promise = dispatch(getAuthMeThunk())

    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccessAction())
    })
}

type AppInitialStateType = typeof appInitialState
type ActionsType = InferActionsTypes<typeof actions>

//  export default
export default appReducer
