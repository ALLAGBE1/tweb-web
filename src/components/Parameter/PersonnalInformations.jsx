import { Avatar, Button, FooterDivider, Modal, Toast } from "flowbite-react";
import { useAccount } from "../../hooks/useAccount";
import { useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useAuth } from "../../hooks/useAuth";
import { FiEdit } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

export function PersonnalInformations() {

    const { account } = useAccount();

    const { authenticate } = useAuth();

    const [file, setFile] = useState([]);

    const [openModal, setOpenModal] = useState(false);

    const [profileLink, setProfileLink] = useState('');

    const { axiosBaseURL } = useAxiosUrl(true);

    const [formData, setFormData] = useState({
        name: account.name,
        username: account.username,
        email: account.email,
        default_currency: account.default_currency
    });

    const updateAccount = (e) => {

        e.preventDefault();

        toast.promise(
            axiosBaseURL.put('/users/' + account._id, {
                ...formData
            }),
            {
                loading: 'Création',
                success: (res) => {
                    authenticate();
                    return 'Profil mis à jour avec succès'
                },
                error: (err) => {
                    const errors = err.response?.data?.errors;
                    const errorMessages = errors ? Object.values(errors) : ['Une erreur s\'est produite lors de la mise à jour.'];
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
                    duration: 3000,
                    icon: '🔥',
                },
            }
        );
    }

    const changeAvatar = async (e) => {

        setOpenModal(true)

        setFile(e.target.files[0])
    }

    const submitAvatar = () => {

        setOpenModal(false)

        const formData = new FormData();

        formData.append('image', file);
        

        toast.promise(

            axiosBaseURL.put(`/users/update-avatar/` + account._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }),
            {
                loading: 'Changement de la photo de profil',
                success: (res) => {
                    authenticate();
                    return 'Photo de profil mis à jour avec succès'
                },
                error: (err) => {
                    const errors = err.response?.data?.errors;
                    const errorMessages = errors ? Object.values(errors) : ['Une erreur s\'est produite lors de la mis à jour'];
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
                    duration: 3000,
                    icon: '🔥',
                },
            }
        );

        try {

            const formData = new FormData();

            formData.append('image', file);

            const response = axiosBaseURL.put(`/users/update-avatar/` + user._id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    }

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <h1 className="text-2xl font-bold text-black">Informations générales</h1>
            <FooterDivider />
            <div className="flex flex-row items-center justify-between w-1/2 text-black">
                <div className="flex flex-row items-center space-x-4">
                    <div className="flex flex-wrap gap-2">
                        <div className="relative px-4">
                            {
                                account.avatar &&
                                <Avatar img={account.avatar} rounded bordered />
                            }
                            {
                                !account.avatar &&
                                <Avatar img={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=` + account.name} rounded bordered />
                            }
                            <label
                                htmlFor="profile"
                                className="absolute left-10 top-8 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                            >
                                <FiEdit />
                                <input
                                    value={profileLink}
                                    onChange={changeAvatar}
                                    type="file"
                                    name="profile"
                                    id="profile"
                                    className="sr-only"
                                    accept="image/*"
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{account.username}</h1>
                        <h1 className="text-sm font-bold">{account.admin ? 'Administrateur' : 'Utilisateur'}</h1>
                    </div>
                </div>
            </div>
            <h1 className="my-8 text-xl font-bold text-black">Informations personnelles</h1>
            <form onSubmit={updateAccount}>
                <div className="flex flex-col justify-between w-full my-4 space-y-3 text-black sm:space-x-2 sm:flex-row sm:space-y-0">
                    <div className="w-full space-y-2 sm:max-w-xs">
                        <label className="font-bold" htmlFor="name">Nom & Prénom</label>
                        <input name="name" onChange={handleInputChange} value={formData.name} id="name" type="text" placeholder="Nom" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div className="w-full space-y-2 sm:max-w-xs">
                        <label className="font-bold" htmlFor="mail">Adresse mail</label>
                        <input name="email" disabled value={formData.email} id="mail" type="text" placeholder="Adresse mail" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                </div>
                <div className="flex flex-col justify-between w-full my-4 space-y-3 text-black sm:space-x-2 sm:flex-row sm:space-y-0">
                    <div className="w-full space-y-2 sm:max-w-xs">
                        <label className="font-bold" htmlFor="username">Nom d'utilisateur</label>
                        <input name="username" onChange={handleInputChange} value={formData.username} id="username" type="text" placeholder="Nom d'utilisateur" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                    <div className="w-full space-y-2 sm:max-w-xs">
                        <label className="font-bold" htmlFor="default_currency">Monnaie par défaut</label>
                        <input name="default_currency" onChange={handleInputChange} value={formData.default_currency} id="default_currency" type="text" placeholder="Monnaie par défaut" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md border-neutral-300 ring-offset-background placeholder:text-neutral-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50" />
                    </div>
                </div>
                <div className="flex flex-col items-end justify-end space-y-4 lg:space-x-4 lg:flex-row lg:space-y-0">
                    <button type="submit" className="inline-flex items-center justify-center px-4 py-2 text-sm tracking-wide text-white transition-colors duration-200 rounded-md bg-[#427aa1] hover:bg-[#3d6785] focus:ring-2 focus:ring-offset-2 focus:bg-[#4780a8] focus:shadow-outline focus:outline-none font-bold">
                        Sauvegarder les modifications
                    </button>
                </div>
            </form>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Êtes vous sûr de vouloir changer votre photo de profile ?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={submitAvatar}>
                                {"Oui, je suis sûr"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                Non
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}