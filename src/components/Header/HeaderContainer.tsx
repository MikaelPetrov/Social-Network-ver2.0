import React from 'react';
import { connect } from "react-redux";
import Header from './Header';
import { logoutThunk } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';

type StatePropsType = {
    isAuth: boolean
    login: string | null
}
type DispatchPropsType = {
    logoutThunk: () => void
}
export type HeaderPropsType = StatePropsType & DispatchPropsType

class HeaderContainer extends React.Component<HeaderPropsType> {
    render() {
        return < Header {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): StatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
const mapDispatchToProps: DispatchPropsType = {
    logoutThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
