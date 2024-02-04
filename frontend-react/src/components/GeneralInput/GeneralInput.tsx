import {useRef, useState} from 'react';
import styles from './GeneralInput.module.css';
import {InputProps} from "../../types/formTypes";
import {FiEye, FiEyeOff} from "react-icons/fi";

export function GeneralInput({value, onChange, label, name, placeholder, size = 'large', type = 'text'}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleShowPassword = () => {
        if (inputRef.current) {
            setShowPassword(!showPassword);
            inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
        }
    }
    return (
        <div className={`${styles.container} ${
            size === 'medium' ? styles.medium : size === 'large' ? styles.large : ''
        }`}>
            <input className={styles.input} type={type} name={name} id={name} value={value}
                   onChange={e => onChange(e.target.value, e.target.name)} placeholder={placeholder || label} autoComplete={'off'}
                   ref={inputRef}
            />
            <label htmlFor={name} className={styles.label}>{label}</label>
            {
                type === 'password' && value && (
                    <span className={styles['hide-password']} onClick={e => {
                        e.stopPropagation();
                        handleShowPassword();
                    }}>
                        {
                            type === 'password' && (showPassword ? <FiEyeOff/> : <FiEye/>)
                        }
                    </span>
                )
            }
        </div>
    )
}