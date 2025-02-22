'use client'

import React, { useState } from "react";
import styles from "./custom-input.module.css";

type CustomInputProps = {
    /** The text label for the input */
    label: string;
    /** Unique identifier for the input. If not provided, will fall back to `name`. */
    id?: string;
    /** Name attribute for the input */
    name?: string;
    /** Type of the input (e.g., text, password, email, etc.) */
    type?: React.HTMLInputTypeAttribute;
    /** Value of the input */
    value?: string;
    /** Error message to display below the input. If present, aria-invalid will be set. */
    error?: string;
    /** Handler for the onChange event */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Whether the field is disabled */
    disabled?: boolean;
    /** Whether the field is required */
    required?: boolean;
};

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    id,
    name,
    type = "text",
    value,
    error,
    onChange,
    disabled,
    required,
}) => {
    // If no explicit ID, use the name
    const inputId = id || name;

    // Track focus to know when to float the label
    const [isFocused, setIsFocused] = useState(false);

    // Determine if the label should float (either on focus or if there's a value)
    const shouldFloatLabel = isFocused || Boolean(value);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
    };

    return (
        <div className={styles.inputWrapper}>
            <input
                id={inputId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error-text` : undefined}
                className={`${styles.input} ${error ? styles.errorInput : ""}`}
            />

            {/* Floating label */}
            <label
                htmlFor={inputId}
                className={`
              ${styles.label} 
              ${shouldFloatLabel ? styles.labelFloat : ""}
            `}
            >
                {label}
                {required && <span className={styles.requiredMark}> *</span>}
            </label>

            {/* Error message */}
            {error && (
                <p className={styles.errorText} id={`${inputId}-error-text`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default CustomInput;
