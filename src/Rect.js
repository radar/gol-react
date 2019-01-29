import React from 'react';

export default ({ x, y, color, size}) => <rect x={x*size} y={-y*size} fill={color} stroke="black" width={size} height={size}/>;
