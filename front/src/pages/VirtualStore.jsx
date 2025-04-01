import { useState } from 'react'

import Header from '../components/Header'

import Search from "../components/Search";

import { FaFilter } from "react-icons/fa";

import CardProduct from '../components/CardProduct'


const VirtualStore = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            image: "https://via.placeholder.com/400x300",
            description: "Smartphone de última generación con cámara de alta resolución",
            availability: 10
        },
        {
            id: 2,
            image: "https://via.placeholder.com/400x300",
            description: "Laptop ultradelgada con procesador de alto rendimiento",
            availability: 15
        },
        {
            id: 3,
            image: "https://via.placeholder.com/400x300",
            description: "Auriculares inalámbricos con cancelación de ruido",
            availability: 0
        },
        {
            id: 4,
            image: "https://via.placeholder.com/400x300",
            description: "Tablet con pantalla retina y lápiz incluido",
            availability: 8
        },
        {
            id: 5,
            image: "https://via.placeholder.com/400x300",
            description: "Smartwatch resistente al agua con monitor cardíaco",
            availability: 12
        },
        {
            id: 6,
            image: "https://via.placeholder.com/400x300",
            description: "Cámara profesional DSLR con lente intercambiable",
            availability: 0
        },
        {
            id: 7,
            image: "https://via.placeholder.com/400x300",
            description: "Altavoz inteligente con asistente de voz integrado",
            availability: 5
        },
        {
            id: 8,
            image: "https://via.placeholder.com/400x300",
            description: "Monitor curvo de 32 pulgadas para gaming",
            availability: 7
        }
    ]);

    return (
        <>
            <Header>
                <div className='flex items-center justify-center gap-6'>
                    <Search placeholder="Buscar productos..." />
                    <FaFilter className='text-[var(--primary-blue)] text-lg cursor-pointer' />
                </div>
            </Header>

            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-[var(--primary-blue)]">Productos</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
            </main>
        </>
    )
}

export default VirtualStore;