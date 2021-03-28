import { Field } from 'redux-form';
import styles from './FormControl.module.css';

const FormControl = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')} >
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const createField = (placeholder, name, component, validator, props = {}, text = '') => (
    <div>
        <Field
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validator}
            {...props} />
        {text}
    </div>
)

export const TextArea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}
