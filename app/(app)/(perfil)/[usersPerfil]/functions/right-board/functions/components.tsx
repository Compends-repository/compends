'use client'

import 'react-grid-layout/css/styles.css';  // Cuida do posicionamento dos blocos
import 'react-resizable/css/styles.css';    // Cuida do redimensionamento dos cantos deles

import { useEffect, useRef, useState } from 'react';
import ReactGridLayout, { useContainerWidth, type Layout } from 'react-grid-layout';
import { motion } from 'motion/react';


export default function Board() {
    const { width, containerRef, mounted } = useContainerWidth();
    const [layout, setLayout] = useState<Layout>([]);
    const [carregado, setCarregado] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

    useEffect(() => {
        fetch('/api/dashboard')
            .then((r) => r.json())
            .then((d) => setLayout(d.layout ?? layout))
            .catch(() => setLayout(layout))
            .finally(() => setCarregado(true))
    }, []);


    function salvar(novo: Layout) {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            fetch('/api/dashboard', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ layout: novo }),
            });
        }, 500);
    }

    function AtChange(novo: Layout) {
        setLayout(novo)
        if (carregado) salvar(novo)
    }


    function AddBlock() {
        const novoId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

        setLayout((atual) => [
            ...atual,
            { i: novoId, x: 0, y: Infinity, w: 2, h: 2 }
        ])
    }

    function RemoveBlock(id: string) {
        setLayout(atual => atual.filter((item) => item.i !== id))
    }

    if (!layout) return <p>Loading...</p>
    if (!carregado) return <p>Loading...</p>

    return (
        <>
            <button onClick={AddBlock} className='absolute top-[50%] left-[1%]'>+</button>
            <div ref={containerRef} className='w-full min-w-0'>
                {mounted && (
                    <ReactGridLayout 
                        width={width}
                        layout={layout}
                        onLayoutChange={AtChange}
                        gridConfig={{ cols: 12, rowHeight: 30 }}
                        onDragStop={(novo) => salvar(novo)}
                        onResizeStop={(novo) => salvar(novo)}
                    >
                        {layout.map(items => (
                            <div
                                key={items.i}
                                className='rounded-[12px] bg-white border-2 border-black'
                            >
                                <input type='text' className='text-black'></input>
                                <button onClick={() => RemoveBlock(items.i)} className='text-black'>x</button>
                            </div>
                        ))}
                    </ReactGridLayout>
                )
                }
            </div >
        </>
    )
}

