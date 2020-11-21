import * as React from 'react'

type InputSizeType = 'lg' | 'sm'

export interface ValidateProps {
    type?: 'success' | 'danger'
    message?: string
}

export interface TextInputProps {
    label?: string
    classNames?: string[]
    subText?: string
    validate?: ValidateProps
    inputSize?: InputSizeType
}

const formInputSize = {
    sm: {
        control: 'form-control-sm',
        label: 'col-form-label col-form-label-sm',
    },
    lg: {
        control: 'form-control-lg',
        label: 'col-form-label col-form-label-lg',
    },
}

const TextInput: React.FC<TextInputProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
    autoComplete = 'off',
    classNames,
    disabled = false,
    inputSize,
    label,
    name,
    onChange,
    placeholder,
    required,
    subText,
    type = 'text',
    validate,
    value,
}) => {
    const validateClass = validate?.type === 'success' ? 'valid-feedback' : 'invalid-feedback'

    return (
        <div className={`form-group ${classNames?.join(' ')}`}>
            <input
                aria-label={name}
                autoComplete={autoComplete}
                className="form-control"
                data-testid={name}
                disabled={disabled}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                type={type}
                value={value}
            />
            {label && (
                <label
                    className={`form-label ${inputSize ? formInputSize[inputSize].label : ''}`}
                    htmlFor={name}
                >
                    {label}
                </label>
            )}
            {subText && <small className="form-text text-muted">{subText}</small>}
            {validate?.message && <div className={validateClass}>{validate.message}</div>}
        </div>
    )
}

export default TextInput
