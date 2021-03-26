import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm } from "redux-form";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import { CreateField, Input } from "../common/FormControl/FormControl";
import s from '../common/FormControl/FormControl.module.css';

const LoginForm = ({ handleSubmit, error }) => {
    return <form onSubmit={handleSubmit}>
        {CreateField('Email', 'email', Input, [required])}
        {CreateField('Password', 'password', Input, [required], { type: 'password' })}
        {CreateField(null, 'rememberMe', Input, [], { type: 'checkbox' }, 'remember me')}
        {error && <div className={s.formSummaryError}>
            {error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'loginForm' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Log In</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
const mapDispatchToProps = {
    loginThunkCreator
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)