import { useState } from "react";

import ButtonDropdown from '../components/ButtonDropdown';
import Header from '../components/Header'
import TableWarehouse from '../components/TableWarehouse'
import ModalAddWarehouse from "../components/modals/ModalAddWarehouse";
import Search from "../components/Search";

import { getWarehouses } from "../services/warehouseService";

import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";

const warehouses = [
    {
        id: 1,
        name: 'Almacén Central',
        creator: 'Juan Pérez',
        location: 'Ciudad de México'
    },
    {
        id: 2,
        name: 'Bodega Norte',
        creator: 'María González',
        location: 'Monterrey'
    },
    {
        id: 3,
        name: 'Depósito Sur',
        creator: 'Carlos Rodríguez',
        location: 'Guadalajara'
    },
    {
        id: 4,
        name: 'Almacén Costero',
        creator: 'Ana Martínez',
        location: 'Veracruz'
    },
    {
        id: 5,
        name: 'Centro de Distribución',
        creator: 'Roberto Sánchez',
        location: 'Puebla'
    }
];


const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const hola = async () => {
            console.log(await getWarehouses());
        }

        hola();
    }, []);

    return (
        <>
            <ModalAddWarehouse isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => { }} />

            <Header>
                <Search placeholder="Buscar almacenes..." />
            </Header>

            <div className='px-8 py-5'>
                <TableWarehouse warehouses={warehouses} />
            </div>

            <div className="fixed bottom-4 right-4">
                <ButtonDropdown IconB={FaPlus} text="Agregar almacen" onClick={() => { setIsModalOpen(true) }} />
            </div>
        </>
    )
}

export default Home;