import { useState } from 'react'

import Header from '../components/Header'

import Search from "../components/Search";

import { FaFilter } from "react-icons/fa";

import CardProduct from '../components/CardProduct'


const VirtualStore = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            image: "https://http2.mlstatic.com/D_NQ_NP_939427-MLU79132024637_092024-O.webp",
            description: "Smartphone de última generación con cámara de alta resolución",
            availability: 10,
            availabilityWarehouse: 20,
        },
        {
            id: 2,
            image: "https://http2.mlstatic.com/D_NQ_NP_732063-MLU78704454934_092024-O.webp",
            description: "Laptop ultradelgada con procesador de alto rendimiento",
            availability: 15,
            availabilityWarehouse: 20,
        },
        {
            id: 3,
            image: "https://http2.mlstatic.com/D_NQ_NP_961140-MLU70461511370_072023-O.webp",
            description: "Auriculares inalámbricos con cancelación de ruido",
            availability: 0,
            availabilityWarehouse: 20,
        },
        {
            id: 4,
            image: "https://http2.mlstatic.com/D_NQ_NP_906395-CBT81544901496_012025-O.webp",
            description: "Tablet con pantalla retina y lápiz incluido",
            availability: 8,
            availabilityWarehouse: 20,
        },
        {
            id: 5,
            image: "https://http2.mlstatic.com/D_NQ_NP_903661-MLU78306464303_082024-O.webp",
            description: "Smartwatch resistente al agua con monitor cardíaco",
            availability: 12,
            availabilityWarehouse: 20,
        },
        {
            id: 6,
            image: "https://http2.mlstatic.com/D_NQ_NP_676438-MCO74307495197_012024-O.webp",
            description: "Cámara profesional DSLR con lente intercambiable",
            availability: 0,
            availabilityWarehouse: 20,
        },
        {
            id: 7,
            image: "https://http2.mlstatic.com/D_NQ_NP_651431-MLU71501749732_092023-O.webp",
            description: "Altavoz inteligente con asistente de voz integrado",
            availability: 5,
            availabilityWarehouse: 20,
        },
        {
            id: 8,
            image: "https://http2.mlstatic.com/D_NQ_NP_827699-MLU74975109969_032024-O.webp",
            description: "Monitor curvo de 32 pulgadas para gaming",
            availability: 7,
            availabilityWarehouse: 20,
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