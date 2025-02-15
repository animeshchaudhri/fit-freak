import React from 'react';

interface CircularProgressProps {
    size?: number;
    strokeWidth?: number;
    progress: number; // Value from 0 to 100.
    backgroundColor?: string;
    progressColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    size = 100,
    strokeWidth = 10,
    progress,
    backgroundColor = '#d9edfe',
    progressColor = '#7ea9e1',
}) => {
    const center = size / 2;
    const radius = center - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size}>
            {/* Background circle */}
            <circle
                stroke={backgroundColor}
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
            />
            {/* Progress circle */}
            <circle
                stroke={progressColor}
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
            />
        </svg>
    );
};

export default CircularProgress;