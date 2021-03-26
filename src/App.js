import { Route, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import React from 'react';
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }
        return <div className='app-wrapper'>
            <HeaderContainer />
            <Navbar />
            <div className='app-wrapper-content'>
                <Route path='/dialogs' render={() => { return <React.Suspense fallback={<div>Loading...</div>}><DialogsContainer /></React.Suspense> }} />
                <Route path='/profile/:userId?' render={() => { return <React.Suspense fallback={<div>Loading...</div>}><ProfileContainer /></React.Suspense> }} />
                <Route path='/users' render={() => { return <React.Suspense fallback={<div>Loading...</div>}><UsersContainer /></React.Suspense> }} />
                <Route path='/login' render={() => <LoginPage />} />
            </div>
        </div>
    }

}

let mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
let mapDispatchToProps = {
    initializeApp
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(App)