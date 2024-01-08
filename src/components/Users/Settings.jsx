import { CiSearch } from "react-icons/ci";
import { Header } from "../Partials/Header";
import { FloatingLabel } from "flowbite-react";
import { VscSettings } from "react-icons/vsc";
import { IoInformation } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { Articles } from "../Parameter/Articles";
import { Notifications } from "../Parameter/Notifications";
import { PersonnalInformations } from "../Parameter/PersonnalInformations";
import { useState } from "react";

export function Settings() {
    const [displayComponent, setDisplayComponent] = useState({
        account: false,
        notification: false,
        personnalInformations: true,
        security: false
    });

    const [actuelComponent, setActuelComponent] = useState("personnalInformations");

    const toggleComponent = (e) => {
        const component = e.currentTarget.id
        setActuelComponent(component)
        setDisplayComponent((data) => ({
            ...data,
            [component]: true,
        }))
        if (component != actuelComponent) {
            setDisplayComponent((data) => ({
                ...data,
                [actuelComponent]: false,
            }))
        }
    }

    return (
        <>
            <Header>
                <div className="flex flex-row items-center justify-start w-full shadow-xl lg:h-32">
                    <div className="lg:grid grid-flow-col justify-stretch md:space-x-4 md:w-[25rem] relative w-full hidden">
                        <CiSearch className="absolute text-xl text-white top-4 md:left-7 left-3" />
                        <FloatingLabel variant="outlined" className="pl-8 text-white focus:border-white trun" placeholder="Rechercher" />
                        <VscSettings className="absolute text-xl text-white rotate-90 top-4 right-3" />
                    </div>
                </div>
            </Header>
            <div className="flex flex-col flex-auto px-6 space-y-6">
                <div className="flex flex-col items-start justify-between w-full space-y-2 lg:flex-row lg:items-center lg:space-y-0">
                    <h1 className="text-2xl text-black">Paramètres</h1>
                </div>
                <div className="flex flex-col flex-auto shadow-2xl lg:flex-row rounded-xl shadow-white">
                    <div className="flex flex-col items-start lg:w-[17rem] px-2 py-4 space-y-4 bg-[#427aa1] rounded-xl w-full">
                        <button onClick={toggleComponent} id="personnalInformations" type="button" className="inline-flex items-center justify-start w-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-200 bg-white border rounded-md text-neutral-500 hover:text-neutral-700 border-neutral-200/70 hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-200/60 focus:shadow-outline">
                            <IoInformation className="text-xl" />
                            Informations générales
                        </button>
                        <button onClick={toggleComponent} id="notification" type="button" className="inline-flex items-center justify-start w-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-200 bg-white border rounded-md text-neutral-500 hover:text-neutral-700 border-neutral-200/70 hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-200/60 focus:shadow-outline">
                            <IoMdNotifications className="text-xl" />
                            Notifications
                        </button>
                        <button onClick={toggleComponent} id="account" type="button" className="inline-flex items-center justify-start w-full px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-200 bg-white border rounded-md text-neutral-500 hover:text-neutral-700 border-neutral-200/70 hover:bg-neutral-100 active:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-200/60 focus:shadow-outline">
                            <FaUser className="text-xl" />
                            Articles
                        </button>
                    </div>
                    <div className="w-full p-4 text-white lg:w-8/12">
                        {
                            displayComponent.account && <Articles />
                        }
                        {
                            displayComponent.notification && <Notifications />
                        }
                        {
                            displayComponent.personnalInformations && <PersonnalInformations />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}