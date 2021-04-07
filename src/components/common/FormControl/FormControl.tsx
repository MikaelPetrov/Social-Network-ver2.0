import { FieldValidatorType } from '../../../utils/validators/validators';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import styles from './FormControl.module.css';
import React from 'react';

//  FormControl
type FormPropsType = {
    meta: WrappedFieldMetaProps
}

const FormControl: React.FC<FormPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return <div className={styles.formControl + ' ' + (hasError ? styles.error : '')} >
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export function createField<FormKeysType extends string>(
    placeholder: string | undefined,
    name: FormKeysType,
    component: React.FC<WrappedFieldProps>,
    validator: Array<FieldValidatorType>,
    props = {}, text = '') {
    return <div>
        <Field
            placeholder={placeholder}
            name={name}
            component={component}
            validate={validator}
            {...props} />{text}
    </div>
}

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export type GetStringKeys<T> = Extract<keyof T, string>
