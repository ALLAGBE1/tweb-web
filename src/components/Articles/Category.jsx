import { Button, Modal, Table } from "flowbite-react";
import { Header } from "../Partials/Header";
import { useEffect } from "react";
import { useArticle } from "../../hooks/useArticle";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Validator from "../../functions/Validator";

export function Category() {

    const { articleList, articles } = useArticle();

    const { axiosBaseURL } = useAxiosUrl(true);

    const [openModal, setOpenModal] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        label: "",
        url: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const save = (e) => {

        e.preventDefault();

        const validator = new Validator();

        validator.required(formData.label, 'label');
        validator.required(formData.url, 'url');

        if (validator.hasErrors()) {
            setErrors(validator.getErrors());
        } else {
            toast.promise(
                axiosBaseURL.post('/articles', formData),
                {
                    loading: "Création d'une nouvelle catégorie",
                    success: () => {
                        articleList()
                        setOpenModal(false);
                        setFormData({
                            label: "",
                            url: ""
                        })
                        return 'Nouvelle catégorie créé avec succès'
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
                        duration: 3000,
                        icon: '🔥',
                    },
                }
            );
        }
    }

    useEffect(() => {
        articleList()
    }, [])

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <Header title='Catégorie des articles' />
            <div className="px-4">
                <div className="flex flex-row items-center justify-end">
                    <Button onClick={() => { setOpenModal(true) }} className="my-4">Ajouter</Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head className='divide-y'>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Label</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Lien RSS</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Statut</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Ajouté le</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y border-[#8D8D8D]">
                            {articles.map(article => {
                                return <TableRow key={article._id} article={article} />
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header><span className="font-bold">Ajouter une nouvelle catégorie</span></Modal.Header>
                <Modal.Body>
                    <form onSubmit={save} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="label" className="font-bold text-start">Label</label>
                            <input id="label" name="label" value={formData.label} onChange={handleInputChange} type="text" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                            {errors.label && <div className="text-red-500 text-start">{errors.label}</div>}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="url" className="font-bold text-start">Url du flux</label>
                            <input id="url" name="url" value={formData.url} onChange={handleInputChange} type="text" className="flex w-full h-10 px-3 py-2 text-sm bg-transparent border rounded-md ring-offset-background placeholder:text-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
                            {errors.url && <div className="text-red-500 text-start">{errors.url}</div>}
                        </div>
                        <div className="flex flex-row items-center justify-end">
                            <Button type="submit">Soumettre</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

function TableRow({ article }) {

    const { axiosBaseURL } = useAxiosUrl(true);

    const { articleList } = useArticle();

    const update = (status, id) => {
        toast.promise(
            axiosBaseURL.put('/articles/' + id, {
                status: status
            }),
            {
                loading: 'Modification du statut',
                success: (res) => {
                    articleList()
                    return 'Statut mis à jour avec succès'
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

    return (
        <>
            <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='text-black'>{article.label.toUpperCase()}</Table.Cell>
                <Table.Cell className='text-black'><a href={article.url} target="_blank"> {article.url}</a></Table.Cell>
                {
                    article.status ?
                        <Table.Cell className='text-black'>Actif</Table.Cell> : <Table.Cell className='text-black'>Non actif</Table.Cell>
                }
                <Table.Cell className='text-black'>{formaDate(article.created_at)}</Table.Cell>
                {
                    article.status ?
                        <Table.Cell className='text-black'><Button onClick={() => { update(false, article._id) }}>Désactiver</Button></Table.Cell> : <Table.Cell className='text-black'><Button onClick={() => { update(true, article._id) }}>Activer</Button></Table.Cell>
                }
            </Table.Row>
        </>
    )
}

function formaDate(date) {

    const dateObject = new Date(date);

    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    const formattedDate = dateObject.toLocaleDateString('en-US', options);

    return formattedDate;
}