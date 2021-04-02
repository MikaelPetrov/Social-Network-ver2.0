import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import UsersContainer from './components/Users/UsersContainer';
import LoginPage from './components/Login/Login';
import React, { Component } from "react";
import { initializeAppThunk } from './redux/app-reducer';
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends Component {

    componentDidMount() {
        this.props.initializeAppThunk();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Switch>
                    <Redirect exact from='/' to='/profile' />
                    <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                    <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                    <Route path='/users' render={() => <UsersContainer />} />
                    <Route path='/login' render={() => <LoginPage />} />
                    <Route path='*' render={() => <div>404 PAGE NOT FOUND</div>} />
                </Switch>
            </div>
        </div>
    }

}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let mapDispatchToProps = {
    initializeAppThunk
}

let AppContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(App)

const AppSquare = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default AppSquare
