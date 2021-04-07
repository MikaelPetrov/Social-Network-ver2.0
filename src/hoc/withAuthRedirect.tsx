import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/redux-store';

type StatePropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as StatePropsType)

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<StatePropsType & DispatchPropsType> = (props) => {

        let { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to={'/login'} />

        return <WrappedComponent {...restProps as WCP} />
    }

    let ConnectedAuthRedirectComponent = connect<StatePropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}
