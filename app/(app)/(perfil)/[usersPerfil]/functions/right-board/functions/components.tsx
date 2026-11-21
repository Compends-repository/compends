import 'react-grid-layout/css/styles.css';  // Cuida do posicionamento dos blocos
import 'react-resizable/css/styles.css';    // Cuida do redimensionamento dos cantos deles

import ReactGridLayout, { useContainerWidth, type Layout } from 'react-grid-layout'
import { verticalCompactor, horizontalCompactor, noCompactor } from 'react-grid-layout/core';
import { useState } from 'react';


export default function Board() {
    const { width, containerRef, mounted } = useContainerWidth();

    const [layout, setLayout] = useState<Layout>([
        
    ]);

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

    return (
        <div ref={containerRef} className='w-full h-full flex flex-column'>
            <button onClick={AddBlock}>+</button>
            {mounted && (
                <ReactGridLayout width={width}
                    layout={layout}
                    gridConfig={{ cols: 12, rowHeight: 30 }}
                    onLayoutChange={setLayout}
                >
                    {layout.map(items => (
                        <div key={items.i} className='rounded-[12px] border-2'>
                            <button onClick={() => RemoveBlock(items.i)}>x</button>
                        </div>
                    ))}
                </ReactGridLayout>
            )
            }
        </div >
    )
}

