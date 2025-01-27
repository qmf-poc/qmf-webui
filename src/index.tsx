import './context';
import HelloWorld from './react/components';
import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('reactMount');
const root = createRoot(container);
root.render(<HelloWorld />);
