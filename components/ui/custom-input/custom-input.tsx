'use client'

import React, { useState, ChangeEvent } from "react";
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

    // Track focus state (to float label on focus)
    const [isFocused, setIsFocused] = useState(false);

    // Maintain an internal value ONLY if we're in uncontrolled mode (value === undefined).
    // If `value` is provided, we use that directly (controlled mode).
    const [uncontrolledValue, setUncontrolledValue] = useState("");

    // Are we controlled or uncontrolled?
    const isControlled = value !== undefined;

    // The actual text that should be displayed in the input
    const displayValue = isControlled ? value : uncontrolledValue;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isControlled) {
            // Delegate changes to parent
            onChange?.(e);
        } else {
            // Update internal state in uncontrolled mode
            setUncontrolledValue(e.target.value);
            // Also call onChange if provided, in case the parent needs notifications
            onChange?.(e);
        }
    };

    // Float the label if the input is focused OR there's some text
    const shouldFloatLabel = isFocused || Boolean(displayValue);

    return (
        <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
                {/* The actual input */}
                <input
                    id={inputId}
                    name={name}
                    type={type}
                    value={displayValue}
                    onChange={handleChange}
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
                    className={`${styles.label} ${shouldFloatLabel ? styles.labelFloat : ""} ${error ? styles.errorLabel : ""}`}
                >
                    {label}
                    {required && <span className={styles.requiredMark}> *</span>}
                </label>


            </div>
            {/* Error message (if any) */}
            {<p className={`${styles.errorText} ${error ? "" : styles.invisibleText}`} id={`${inputId}-error-text`}>
                {error ? error : "No Error"}
            </p>}
        </div>
    );
};

export default CustomInput;
