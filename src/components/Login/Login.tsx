import { connect } from "react-redux";
import { Redirect } from "react-router";
import { InjectedFormProps, reduxForm } from "redux-form";
import { loginThunk } from '../../redux/auth-reducer';
import { AppStateType } from "../../redux/redux-store";
import { required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControl/FormControl';
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
type LoginFormValueKeysType = Extract<keyof LoginFormValuesType, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormPropsType> & LoginFormPropsType> = ({ handleSubmit, error, captchaUrl }) => {
    return <form onSubmit={handleSubmit}>
        {createField<LoginFormValueKeysType>('Email', 'email', Input, [required])}
        {createField<LoginFormValueKeysType>('Password', 'password', Input, [required], { type: 'password' })}
        {createField<LoginFormValueKeysType>(undefined, 'rememberMe', Input, [], { type: 'checkbox' }, 'remember me')}
        {captchaUrl && <img src={captchaUrl} />}
        {captchaUrl && createField<LoginFormValueKeysType>('Symbols from image', 'captcha', Input, [required])}
        {error && <div className={s.formSummaryError}>{error}</div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}
//  LoginReduxForm
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormPropsType>({ form: 'loginForm' })(LoginForm)

//  Login
const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
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

//  mstp and mdtp
type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
const mapDispatchToProps: MapDispatchToPropsType = {
    loginThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
