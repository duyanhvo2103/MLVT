import React, { useEffect, useState } from 'react';
import CarouselCard from './CarouselCard';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
    'Video Translation',
    'Text Generation',
    'Subtitle Generation',
    'Voice Generation',
    'Lip synchronization',
];

const CardSlider: React.FC = () => {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={currentTitleIndex}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', width: '100%' }}>
                <CarouselCard
                    title={titles[currentTitleIndex]}
                    onClick={() => console.log('Card clicked')}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default CardSlider;
