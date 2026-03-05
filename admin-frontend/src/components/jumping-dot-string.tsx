import React, { useEffect, useState } from 'react';

interface JumpingDotsStringProps {
    text: string;
    interval?: number;
    dotColor?: string;
    textColor?: string;
}

export const JumpingDotsString: React.FC<JumpingDotsStringProps> = ({
    text,
    interval = 300,
    dotColor = '#FFFF',
    textColor = '#FFFF',
}) => {
    const [activeDot, setActiveDot] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveDot((prev) => (prev + 1) % 6);
        }, interval);
        return () => clearInterval(timer);
    }, [interval]);

    const dotStyle = (index: number): React.CSSProperties => ({
        display: 'inline-block',
        margin: '0 1px',
        color: dotColor,
        animation: activeDot === index ? 'jump 0.4s ease-in-out' : 'none',
    });

    return (
        <>
            <style>
                {`
          @keyframes jump {
            0%   { transform: translateY(0); }
            30%  { transform: translateY(-6px); }
            60%  { transform: translateY(0); }
            100% { transform: translateY(0); }
          }
        `}
            </style>

            <span style={{ fontFamily: 'monospace', display: 'inline-flex', alignItems: 'center' }}>
                <span style={dotStyle(0)}>.</span>
                <span style={dotStyle(1)}>.</span>
                <span style={dotStyle(2)}>.</span>
                <span style={{ margin: '0 4px', color: textColor }}>{text}</span>
                <span style={dotStyle(3)}>.</span>
                <span style={dotStyle(4)}>.</span>
                <span style={dotStyle(5)}>.</span>
            </span>
        </>
    );
};

export default JumpingDotsString;
