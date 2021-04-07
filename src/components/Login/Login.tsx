import { connect } from "react-redux";
import { Redirect } from "react-router";
import { InjectedFormProps, reduxForm } from "redux-form";
import { loginThunk } from '../../redux/auth-reducer';
import { AppStateType } from "../../redux/redux-store";
import { required } from '../../utils/validators/validators';
import { createField, GetStringKeys, Input } from '../common/FormControl/FormControl';
import s from '../common/FormControl/FormControl.module.css';

//  LoginForm
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormPropsType = {
    captchaUrl: string | null
}
type LoginFormKeysType = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormPropsType> & LoginFormPropsType> = ({ handleSubmit, error, captchaUrl }) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormKeysType>('Email', 'email', Input, [required])}
        {createField<LoginFormKeysType>('Password', 'password', Input, [required], { type: 'password' })}
        {createField<LoginFormKeysType>(undefined, 'rememberMe', Input, [], { type: 'checkbox' }, 'remember me')}
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField<LoginFormKeysType>('Symbols from image', 'captcha', Input, [required])}
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

//  LoginReduxForm
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormPropsType>({ form: 'loginForm' })(LoginForm)

//  Login
type StatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type DispatchPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginPropsType = StatePropsType & DispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {

    const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): StatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
const mapDispatchToProps: DispatchPropsType = {
    loginThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
