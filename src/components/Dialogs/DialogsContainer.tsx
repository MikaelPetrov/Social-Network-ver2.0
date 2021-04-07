import Dialogs from './Dialogs';
import { actions, DialogsInitialStateType } from '../../redux/dialogs-reducer';
import { connect } from "react-redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { AppStateType } from '../../redux/redux-store';
import React from 'react';

type StatePropsType = {
    dialogsPage: DialogsInitialStateType
}
type DispatchPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = StatePropsType & DispatchPropsType

const mapStateToProps = (state: AppStateType): StatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps: DispatchPropsType = {
    sendMessage: actions.sendMessageAction
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)
