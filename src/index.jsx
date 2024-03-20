import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/theme-context/theme-context';
import { MainView } from './components/main-view/main-view';
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.scss'; //import statement that you need to bundle './index.scss'

// Main component (will eventually use all the others)
const App = () => {

  return (
    <ThemeProvider>
    <Container className='background'>
      <MainView />
    </Container>
    </ThemeProvider>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);