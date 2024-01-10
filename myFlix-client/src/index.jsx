import { createRoot } from 'react-dom/client';

//Import statement to indicate that you need to bundle `./index.scss` 
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
      <div>Good morning</div>
    </div >
  );
};

// Find the root of our app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tell React to render our app in the root DOM element
root.render(<MyFlixApplication />);