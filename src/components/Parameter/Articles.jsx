/* eslint-disable react/no-unescaped-entities */
import { FooterDivider, ToggleSwitch } from "flowbite-react";
import { useArticle } from "../../hooks/useArticle";
import { useEffect } from "react";
import { useAccount } from "../../hooks/useAccount";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAxiosUrl } from "../../hooks/useAxiosUrl";
import { useAuth } from "../../hooks/useAuth";

export function Articles() {

    const { authenticate } = useAuth();

    const { axiosBaseURL } = useAxiosUrl(true);

    const { articles, articleList } = useArticle();

    const { account } = useAccount();

    const updateKeyWord = (id) => {

        toast.promise(
            axiosBaseURL.put('/users/update-key-word/' + account._id, {
                category: id
            }),
            {
                loading: 'Traitement',
                success: (res) => {
                    authenticate();
                    return 'Article parametré avec succcès'
                },
                error: (err) => {
                    const errors = err.response?.data?.errors;
                    const errorMessages = errors ? Object.values(errors) : ['Une erreur s\'est produite'];
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


    useEffect(() => {
        articleList()
    }, [])


    console.log(account.key_word);

    return (
        <>
            <Toaster position="top-right"
                reverseOrder={false} />
            <h1 className="text-2xl font-bold text-black">Mes catégories d'article préférées</h1>
            <FooterDivider />
            <h1 className="text-xl font-bold text-black">Liste des catégories</h1>
            <div className="flex flex-col w-full my-4 space-y-4">

                {

                    articles.filter((article) => { return article.status == true }).map((article) => {
                        return <div key={article._id} className="flex flex-row items-center justify-between w-full text-black">
                            <label htmlFor={article._id}>
                                <h1 className="font-bold">{article.label}</h1>
                            </label>
                            <ToggleSwitch id={article._id} checked={account.key_word.includes(article._id) ? true : false} onChange={() => { updateKeyWord(article._id) }} />
                        </div>
                    })

                }

            </div>
        </>
    )
}