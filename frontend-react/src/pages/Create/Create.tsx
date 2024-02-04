import {FormField} from "../../types/formTypes";
import {Form} from "../../components/Form/Form.tsx";
import React, {useEffect, useState} from "react";
import {useFetch} from "../../hooks/useFetch.ts";
import {FiLoader} from "react-icons/fi";

export function Create() {

    const {data, loading, error, post, postFile} = useFetch('http://localhost:3000/api');
    const [formFilled, setFormFilled] = useState(false);
    const [errorForm, setErrorForm] = useState<{ [key: string]: string }>({});
    const [createEvent, setCreateEvent] = useState({
        name: '',
        description: '',
        date: '',
        number_assistants: 0,
        image: ''
    })

    const numberAssistantsValidation = (value: string) => {
        return parseInt(value) >= 1;
    }

    const formFields: FormField[] = [
        {
            name: 'name',
            label: 'Nombre',
            type: 'text',
            size: 'large',
            value: createEvent.name,
            onChange: (value) => setCreateEvent({...createEvent, name: value})
        },
        {
            name: 'description',
            label: 'Descripción',
            type: 'textarea',
            size: 4,
            value: createEvent.description,
            onChange: (value) => setCreateEvent({...createEvent, description: value})
        },
        {
            name: 'date',
            label: 'Fecha',
            type: 'date',
            size: 'medium',
            value: createEvent.date,
            onChange: (value) => setCreateEvent({...createEvent, date: value})
        },
        {
            name: 'number_assistants',
            label: 'Número de asistentes',
            type: 'number',
            size: 'medium',
            value: createEvent.number_assistants,
            onChange: (value) => setCreateEvent({...createEvent, number_assistants: numberAssistantsValidation(value) ? parseInt(value) : 0})
        },
        {
            name: 'image',
            label: 'Imagen',
            type: 'file',
            size: 'large',
            value: createEvent.image,
            onChange: (file: File) => {
                setCreateEvent({...createEvent, image: file.name})
                const formData = new FormData();
                formData.append('image', file);
                postFile('/events/upload', formData)
            }
        }
    ]

    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (createEvent.name === '') errors.name = 'El nombre es obligatorio';
        if (createEvent.description === '') errors.description = 'La descripción es obligatoria';
        if (createEvent.date === '') errors.date = 'La fecha es obligatoria';
        if (createEvent.number_assistants === 0) errors.number_assistants = 'El número de asistentes es obligatorio';
        if (createEvent.image === '') errors.image = 'La imagen es obligatoria';
        return errors;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            setFormFilled(true);
        } else {
            setErrorForm(errors);
        }
    }

    useEffect(() => {
        if (data.msg === "Imagen subida" && formFilled) {
            console.log('ingreso a la creación del evento', data);
            post('/events', {
                name: createEvent.name,
                description: createEvent.description,
                date: createEvent.date,
                number_assistants: createEvent.number_assistants,
                image: data.image
            })
        }
    }, [data, formFilled]);


    return (
        <div>
            {
                error && <p>Error al cargar la página</p>
            }
            <Form fields={formFields} onSubmit={handleSubmit} cancelButton={false} title={'Crear evento'}
                  errors={errorForm} textButton={createEvent.image && loading ? (<span><FiLoader/></span>) : 'Crear Evento'}/>
        </div>
    )
}