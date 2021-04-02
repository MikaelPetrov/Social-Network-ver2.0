import { connect } from "react-redux";
import { Redirect } from "react-router";
import { reduxForm } from "redux-form";
import { loginThunk } from '../../redux/auth-reducer';
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControl/FormControl';
import s from '../common/FormControl/FormControl.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return <form onSubmit={handleSubmit}>
        {createField('Email', 'email', Input, [required])}
        {createField('Password', 'password', Input, [required], { type: 'password' })}
        {createField(null, 'rememberMe', Input, [], { type: 'checkbox' }, 'remember me')}
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField('Symbols from image', 'captcha', Input, [required])}
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({ form: 'loginForm' })(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunk(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Log In</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
const mapDispatchToProps = {
    loginThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
