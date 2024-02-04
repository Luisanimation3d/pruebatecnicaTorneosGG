import {Form} from "../../components/Form/Form.tsx";
import {FormField} from "../../types/formTypes";
import React, {useEffect, useState} from "react";
import styles from './Login.module.css'
import {useDispatch} from "react-redux";
import loginImage from '../../assets/images/loginImage.jpg'
import {useFetch} from "../../hooks/useFetch.ts";
import {Loader} from "../../components/Loader/Loader.tsx";
import {login} from "../../features/auth/authSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export function Login() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const {data, loading, post, error} = useFetch('http://localhost:3000/api')
    const [errorLogin, setErrorLogin] = useState<{ [key: string]: string }>()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const fields: FormField[] = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            size: 'large',
            value: loginForm.email,
            onChange: (value) => setLoginForm({...loginForm, email: value})
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            size: 'large',
            value: loginForm.password,
            onChange: (value) => setLoginForm({...loginForm, password: value})
        }
    ]

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!loginForm.email) {
            errors.email = 'El email es requerido'
        }
        if (!loginForm.password) {
            errors.password = 'La contraseña es requerida'
        }
        if (loginForm.email && !emailValidation.test(loginForm.email)) {
            errors.email = 'El email no es válido'
        }
        setErrorLogin(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return
        post('/auth/', loginForm)
    }

    useEffect(() => {
        if (data.token && data.user) {
            dispatch(login(data))
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/profile')
        }
    }, [data]);


    return (
        <div className={styles.login__container}>
            <div className={styles.login__image__container}>
                <img src={loginImage} alt="Login"/>
            </div>
            <div className={styles.login__form__container}>
                <Form fields={fields} onSubmit={handleSubmit} title={'Iniciar Sesión'} cancelButton={false}
                      errors={error || errorLogin}
                        textButton={loading ? <Loader/> : 'Iniciar Sesión'}
                />
                <span className={styles.register__link}>¿Aún no tienes una cuenta? <Link
                    to={'/register'}>Haz clic aquí</Link></span>
            </div>
        </div>
    )
}