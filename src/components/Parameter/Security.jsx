/* eslint-disable react/no-unescaped-entities */
import { FooterDivider, ToggleSwitch } from "flowbite-react";
import { useState } from "react";

export function Security() {
    const [alert, setAlert] = useState(true);
    const [sms, setSms] = useState(true);
    const [mail, setMail] = useState(true);
    return (
        <>
            <h1 className="text-2xl font-bold">Sécurité</h1>
            <FooterDivider />
            <h2 className="my-4 underline">Gestion des mots de passe</h2>
            <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-row items-center justify-between w-full space-x-2 text-white sm:space-x-0">
                    <label htmlFor="alert">
                        <h1 className="font-bold truncate">Connexion vérification en deux étapes</h1>
                        <p className="text-sm">Lorem ipsum dolor </p>
                    </label>
                    <ToggleSwitch id="alert" checked={alert} onChange={setAlert} />
                </div>
                <div className="flex flex-row items-center justify-between w-full text-white">
                    <label htmlFor="sms">
                        <h1 className="font-bold">Configuration d'email</h1>
                        <p className="text-sm">Lorem ipsum dolor </p>
                    </label>
                    <ToggleSwitch id="sms" checked={sms} onChange={setSms} />
                </div>
                <div className="flex flex-row items-center justify-between w-full text-white">
                    <label htmlFor="mail">
                        <h1 className="font-bold">Configuration SMS</h1>
                        <p className="text-sm">Lorem ipsum dolor </p>
                    </label>
                    <ToggleSwitch id="mail" checked={mail} onChange={setMail} />
                </div>
                <h2 className="my-4 underline">Gestion des mots de passe</h2>
                <div className="flex flex-col justify-between w-full space-y-4 text-white sm:items-center sm:flex-row sm:space-y-0">
                    <label htmlFor="another_phone">
                        <h1 className="font-bold">Changer le mot de passe</h1>
                        <p className="text-sm">Lorem ipsum dolor </p>
                    </label>
                    <button type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold tracking-wide text-black transition-colors duration-200 bg-gray-100 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 focus:shadow-outline focus:outline-none">
                        Changer le mot de passe
                    </button>
                </div>
            </div>
        </>
    )
}