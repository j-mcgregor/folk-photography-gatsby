import * as React from 'react'

type TextAreaSizeType = 'lg' | 'sm'

export interface TextAreaProps {
    label?: string
    classNames?: string[]
    subText?: string
    validate?: {
        type?: 'success' | 'danger'
        message?: string
    }
    inputSize?: TextAreaSizeType
}

const TextArea: React.FC<TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
    placeholder,
    label,
    name,
    required,
    value,
    onChange,
    classNames = [],
    autoComplete = 'off',
    subText,
    disabled = false,
    validate,
    inputSize,
    rows = 3,
}) => {
    const validateClass = validate?.type === 'success' ? 'valid-feedback' : 'invalid-feedback'
    const classes: string[] = ['form-group']
    validate?.type && classes.push(`has-${validate.type}`)
    inputSize && classes.push(`form-group-${inputSize}`)

    return (
        <div className={[...classes, ...classNames].join(' ')}>
            <textarea
                placeholder={placeholder}
                className="form-control"
                name={name}
                required={required}
                {...(value && onChange ? { value } : value && !onChange && { defaultValue: '' })}
                onChange={onChange}
                data-testid={name}
                aria-label={name}
                autoComplete={autoComplete}
                disabled={disabled}
                rows={rows}
            />
            {label && (
                <label className="form-label" htmlFor={name}>
                    {label}
                </label>
            )}
            {subText && <small className="form-text text-muted">{subText}</small>}
            {validate?.message && <div className={validateClass}>{validate.message}</div>}
        </div>
    )
}

export default TextArea
