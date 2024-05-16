import React, { useState } from 'react'

export const useForm = (initialform, validationForm) => {
  
    const [form, setForm] = useState(initialform);
    const [errors, setErrors] = useState({});
  
  
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    
    }
    const handleBlur = (e)=>{
        handleChange(e);
        setErrors(validationForm(form));
    }
  
    return {
        form
        ,errors
        ,handleBlur
        ,handleChange
        ,setErrors
        ,setForm
    };
}

