import {FormField} from "../../types/formTypes";
import {Form} from "../../components/Form/Form.tsx";
import {useEffect, useState} from "react";
import styles from './Register.module.css'

import registerImage from '../../assets/images/registerImage.jpg'
import {useFetch} from "../../hooks/useFetch.ts";
import {Loader} from "../../components/Loader/Loader.tsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export function Register() {

    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
        birthday: '',
        image: ''
    })


    const [errorRegister, setErrorRegister] = useState<{ [key: string]: string }>({});
    const [formFilled, setFormFilled] = useState(false);

    const {data, loading, post, postFile, error} = useFetch('http://localhost:3000/api')

    const formFields: FormField[] = [
        {
            name: 'firstname',
            label: 'Nombres',
            type: 'text',
            size: 'medium',
            value: registerForm.firstname,
            onChange: (value) => setRegisterForm({...registerForm, firstname: value})
        },
        {
            name: 'lastname',
            label: 'Apellidos',
            type: 'text',
            size: 'medium',
            value: registerForm.lastname,
            onChange: (value) => setRegisterForm({...registerForm, lastname: value})
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            size: 'large',
            value: registerForm.email,
            onChange: (value) => setRegisterForm({...registerForm, email: value})
        },
        {
            name: 'password',
            label: 'Contraseña',
            type: 'password',
            size: 'medium',
            value: registerForm.password,
            onChange: (value) => setRegisterForm({...registerForm, password: value})
        },
        {
            name: 'repeatPassword',
            label: 'Repetir contraseña',
            type: 'password',
            size: 'medium',
            value: registerForm.repeatPassword,
            onChange: (value) => setRegisterForm({...registerForm, repeatPassword: value})
        },
        {
            name: 'birthdate',
            label: 'Fecha de nacimiento',
            type: 'date',
            size: 'large',
            value: registerForm.birthday,
            onChange: (value) => setRegisterForm({...registerForm, birthday: value})
        },
        {
            name: 'image',
            label: 'Imagen',
            type: 'file',
            size: 'large',
            value: registerForm.image,
            onChange: (file: File) => {
                setRegisterForm({...registerForm, image: file.name})
                const formData = new FormData();
                formData.append('image', file);
                postFile('/users/upload', formData)
                console.log('se está enviando la imagen al servidor')
            }
        }
    ]

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        const emailValidation = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!registerForm.firstname) {
            errors.firstname = 'El nombre es requerido'
        }
        if (!registerForm.lastname) {
            errors.lastname = 'El apellido es requerido'
        }
        if (!registerForm.email) {
            errors.email = 'El email es requerido'
        }
        if (!registerForm.password) {
            errors.password = 'La contraseña es requerida'
        }
        if (!registerForm.repeatPassword) {
            errors.repeatPassword = 'La contraseña es requerida'
        }
        if (registerForm.email && !emailValidation.test(registerForm.email)) {
            errors.email = 'El email no es válido'
        }
        if (registerForm.password !== registerForm.repeatPassword) {
            errors.repeatPassword = 'Las contraseñas no coinciden'
            errors.password = 'Las contraseñas no coinciden'
        }
        if (!registerForm.birthday) {
            errors.birthdate = 'La fecha de nacimiento es requerida'
        }
        if (registerForm.birthday && new Date(registerForm.birthday).getFullYear() >= new Date().getFullYear()) {
            errors.birthdate = 'La fecha de nacimiento no puede ser mayor a la fecha actual'
        }
        setErrorRegister(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!validateForm()) return
        setFormFilled(true)
        if (registerForm.image === '') {
            post('/users', {...registerForm, image: 'default.jpg'})
        }
    }

    useEffect(() => {
        if (data.msg === "Imagen subida" && formFilled) {
            post('/users', {
                firstname: registerForm.firstname,
                lastname: registerForm.lastname,
                email: registerForm.email,
                password: registerForm.password,
                birthday: registerForm.birthday,
                image: data.image
            })

        }else if(data.msg === "Usuario creado"){
            Swal.fire({
                title: 'Usuario creado',
                text: 'Usuario creado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1000
            })
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }
    }, [data, formFilled]);

    return (
        <div className={styles.register__container}>
            <div className={styles.register__form__container}>
                <Form fields={formFields} onSubmit={handleSubmit} cancelButton={false} title={'Registrarse'}
                      errors={error || errorRegister} textButton={loading ? <Loader/> : 'Crear cuenta'}/>
                <span className={styles.register__link}>¿Ya tienes una cuenta? <Link to={'/login'}>Haz clic aquí</Link></span>
            </div>
            <div className={styles.register__image__container}>
                <img src={registerImage} alt="Register"/>
            </div>
        </div>
    );
}