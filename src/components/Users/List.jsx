import { Button, FloatingLabel, Modal, Table } from 'flowbite-react';
import { Header } from '../Partials/Header';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';


export function UsersList() {

    const { users, userList } = useUser();

    useEffect(() => {
        userList()
    }, [])

    return (
        <>
            <Header title='Liste des utilisateurs' />
            <div className="px-4">
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head className='divide-y'>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Nom complet</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Nom d'utilisateur</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Adresse mail</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Rôle</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Statut du compte</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent text-white border-b-2 border-[#8D8D8D] bg-[#427aa1] font-bold'>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y border-[#8D8D8D]">
                            {users.map(user => {
                                return <TableRow key={user._id} user={user} />
                            })}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    )
}

function TableRow({ user }) {
    return (
        <>
            <Table.Row className="dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className='text-black'>{user.name.toUpperCase()}</Table.Cell>
                <Table.Cell className='text-black'>{user.username.toUpperCase()}</Table.Cell>
                <Table.Cell className='text-black'>{user.email}</Table.Cell>
                {
                    user.admin ?
                        <Table.Cell className='text-black'>Admin</Table.Cell> : <Table.Cell className='text-black'>Utilisateur</Table.Cell>
                }
                {
                    user.status ?
                        <Table.Cell className='text-black'>Compte actif</Table.Cell> : <Table.Cell className='text-black'>Compte inactif</Table.Cell>
                }
            </Table.Row>
        </>
    )
}