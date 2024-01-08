import { FooterDivider, ToggleSwitch } from "flowbite-react";
import { useState } from "react";

export function Notifications() {
    const [alert, setAlert] = useState(true);
    const [mail, setMail] = useState(true);
    return (
        <>
            <h1 className="text-2xl font-bold ">Notifications</h1>
            <FooterDivider />
            <h2 className="my-4 underline">Gestion des mots de passe</h2>
            <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-row items-center justify-between w-full text-black">
                    <label htmlFor="alert">
                        <h1 className="font-bold">Recevoir des alertes de sécurité</h1>
                        <p className="text-sm">Être informé des tentatives de connexion</p>
                    </label>
                    <ToggleSwitch id="alert" checked={alert} onChange={setAlert} />
                </div>
                <div className="flex flex-row items-center justify-between w-full text-black">
                    <label htmlFor="mail">
                        <h1 className="font-bold">Souscrire aux newsletters</h1>
                        <p className="text-sm">Recevoir des actualités dans votre boite mail </p>
                    </label>
                    <ToggleSwitch id="mail" checked={mail} onChange={setMail} />
                </div>
            </div>
        </>
    )
}