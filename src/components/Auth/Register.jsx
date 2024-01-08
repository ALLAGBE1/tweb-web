import { useState } from "react";
import Validator from "../../functions/Validator";
import banner from "../../assets/banner.jpeg";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash, FaSleigh } from "react-icons/fa";
import { Button } from "flowbite-react";
import toast, { Toaster } from 'react-hot-toast';
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

export function Register() {

    const { axiosBaseURL } = useAxiosUrl();
    const navigate = useNavigate();
    const [showPassword1, setShowPassword1] = useState(false);
    const type1 = showPassword1 ? 'text' : 'password';
    const [showPassword2, setShowPassword2] = useState(false);
    const type2 = showPassword2 ? 'text' : 'password';
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        username: "",
        password_confirmed: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const validator = new Validator();
        validator.required(formData.name, 'name');
        validator.required(formData.username, 'username');
        validator.required(formData.password, 'password');
        validator.required(formData.password_confirmed, 'password_confirmed');
        validator.email(formData.email, 'email');
        validator.min(formData.password, 'password', 6);
        validator.same(formData.password_confirmed, formData.password, 'password_confirmed');

        setErrors(validator.getErrors());

        if (!validator.hasErrors()) {
            toast.promise(
                axiosBaseURL.post('/users', {
                    ...formData
                }),
                {
                    loading: 'Création',
                    success: (res) => {
                        setFormData(
                            {
                                email: "",
                                password: "",
                                name: "",
                                username: "",
                                password_confirmed: ""
                            }
                        )
                        navigate('/login')
                        return 'Collaborateur ajouté avec succès'
                    },
                    error: (err) => {
                        const errors = err.response?.data?.errors;
                        const errorMessages = errors ? Object.values(errors) : ['Une erreur s\'est produite lors de la création.'];
                        return (
                            <div>
                                <ul>
                                    {errorMessages.map((errorMessage, index) => (
                                        <div key={index}>
                                            <li>{errorMessage}</li>
                                            <hr />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        );
                    },
                },
                {
                    style: {
                        minWidth: '250px',
                    },
                    success: {
                        duration: 9000,
                        icon: '🔥',
                    },
                }
            );
        }
    };

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <div className="flex flex-row items-center justify-center w-full h-screen px-2 bg-center bg-cover shadow-md lg:space-x-2 lg:shadow-white" style={{ backgroundImage: `url(${banner})` }}>
                <form onSubmit={handleRegister} className="flex flex-col w-full px-6 py-12 space-y-4 text-center shadow-xl lg:w-4/12 bg-[#427aa1] rounded-xl text-white md:w-8/12">
                    <h5 className="text-2xl font-bold">Inscription</h5>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="name" className="font-bold text-start">Nom complet</label>
                        <input id="name" name="name" value={formData.name} onChange={handleInputChange} type="text" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        {errors.name && <div className="text-red-500 text-start">{errors.name}</div>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="username" className="font-bold text-start">Nom d'utilisateur</label>
                        <input id="username" name="username" value={formData.username} onChange={handleInputChange} type="text" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        {errors.username && <div className="text-red-500 text-start">{errors.username}</div>}
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className="font-bold text-start">Email</label>
                        <input id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        {errors.email && <div className="text-red-500 text-start">{errors.email}</div>}
                    </div>
                    <div className="relative flex flex-col space-y-2">
                        <label htmlFor="password" className="font-bold text-start">Mot de passe</label>
                        {!showPassword1 && <IoEyeSharp className="absolute cursor-pointer top-9 right-4" onClick={() => { setShowPassword1(true) }} />}
                        {showPassword1 && <FaEyeSlash className="absolute cursor-pointer top-9 right-4" onClick={() => { setShowPassword1(false) }} />}
                        <input id="password" name="password" value={formData.password} onChange={handleInputChange} type={type1} className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        {errors.password && <div className="text-red-500 text-start">{errors.password}</div>}
                    </div>
                    <div className="relative flex flex-col space-y-2">
                        <label htmlFor="password_confirmed" className="font-bold text-start">Confirmer le mot de passe</label>
                        {!showPassword2 && <IoEyeSharp className="absolute cursor-pointer top-9 right-4" onClick={() => { setShowPassword2(true) }} />}
                        {showPassword2 && <FaEyeSlash className="absolute cursor-pointer top-9 right-4" onClick={() => { setShowPassword2(false) }} />}
                        <input id="password_confirmed" name="password_confirmed" value={formData.password_confirmed} onChange={handleInputChange} type={type2} className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-neutral-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                        {errors.password_confirmed && <div className="text-red-500 text-start">{errors.password_confirmed}</div>}
                    </div>
                    <div className="w-full">
                        <Button type="submit" className="w-full font-bold" color="light">Inscription</Button>
                    </div>
                    <div>
                        Vous avez déjà un compte ? <a href="/login">Connectez-vous</a>
                    </div>
                </form>
            </div>
        </>
    )
}