import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormControl/FormControl";
import s from '../common/FormControl/FormControl.module.css';


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field
                placeholder={'Email'}
                name={'email'}
                component={Input}
                validate={[required]} />
        </div>
        <div>
            <Field
                placeholder={'Password'}
                type={'password'}
                name={'password'}
                component={Input}
                validate={[required]} />
        </div>
        <div>
            <Field
                type={'Checkbox'}
                name={'rememberMe'}
                component={Input} /> remember me
        </div>
        {props.error && <div className={s.formSummaryError}>
            {props.error}
        </div>}
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({
    form: 'loginForm'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>
            Log In
        </h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

let mapDispatchToProps = {
    loginThunkCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);