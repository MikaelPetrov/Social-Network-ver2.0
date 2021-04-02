import { getAuthMeThunk } from './auth-reducer';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

//  appInitialState and appReducer
let appInitialState = {
    initialized: false as boolean
}

type AppInitialStateType = typeof appInitialState

const appReducer = (state = appInitialState, action: any): AppInitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state, initialized: true
            }
        default:
            return state
    }
}

//  initializedSuccessAction
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS    //  'INITIALIZED_SUCCESS'
}
export const initializedSuccessAction = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//  initializeAppThunk
export const initializeAppThunk = () => (dispatch: any) => {
    let promise = dispatch(getAuthMeThunk())
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccessAction())
        })
}

//  export default
export default appReducer
