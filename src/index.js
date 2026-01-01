/**
 * index.js (or main.js) - Application Entry Point
 * 
 * This is the entry point of the React application. It's the first JavaScript
 * file that runs when your app loads. Its job is to:
 * 1. Find the HTML element where our React app should be mounted
 * 2. Create a React root
 * 3. Render our main App component into that root
 * 
 * Think of this as the "bridge" between your HTML file and your React components.
 */

/**
 * Import StrictMode from React
 * 
 * StrictMode is a development tool that helps you write better React code.
 * It doesn't render any visible UI - it's a wrapper that activates additional
 * checks and warnings for its descendants.
 * 
 * What StrictMode does:
 * - Identifies components with unsafe lifecycles (in class components)
 * - Warns about legacy string ref API usage
 * - Warns about deprecated findDOMNode usage
 * - Detects unexpected side effects by intentionally double-invoking functions
 * - Warns about legacy context API
 * - Ensures your components are resilient to future React features
 * 
 * Note: StrictMode checks only run in development mode, not in production
 */
import { StrictMode } from "react";

/**
 * Import createRoot from react-dom/client
 * 
 * createRoot is part of React 18's new "Concurrent" rendering API.
 * It creates a root React tree that can render your components.
 * 
 * This replaced the old ReactDOM.render() method from React 17 and earlier.
 * The new API enables concurrent features like:
 * - Automatic batching of state updates
 * - Transitions for marking updates as non-urgent
 * - Suspense for data fetching
 * 
 * The 'react-dom' package is the glue between React and the browser DOM.
 * React itself is platform-agnostic - react-dom makes it work in browsers.
 */
import { createRoot } from "react-dom/client";

/**
 * Import the CSS styles
 * 
 * This imports the global stylesheet for the application.
 * In modern build tools (like Create React App, Vite, or Webpack),
 * you can import CSS files directly in JavaScript.
 * 
 * The build tool will:
 * 1. Process the CSS file
 * 2. Bundle it with other CSS
 * 3. Inject it into the page (usually as a <style> tag or linked stylesheet)
 * 
 * The ./ means "current directory" - so it's looking for styles.css
 * in the same folder as this index.js file
 */
import "./styles.css";

/**
 * Import the App component
 * 
 * This is your main React component - the top of your component tree.
 * In the tic-tac-toe tutorial, this is the Game component (or whatever
 * you've named it in App.js).
 * 
 * The default export from ./App.js is imported here as 'App'.
 * The file extension (.js or .jsx) is optional in most build tools.
 */
import App from "./App";

/**
 * Create the React root
 * 
 * This finds the HTML element with id="root" in your index.html file
 * and creates a React root from it.
 * 
 * Breaking it down:
 * - document.getElementById("root") - This is vanilla JavaScript that searches
 *   the HTML document for an element with id="root". It returns a DOM element.
 * 
 * - createRoot(...) - This takes that DOM element and creates a React root.
 *   The root is where React will "attach" itself to the DOM and start
 *   rendering components.
 * 
 * In your index.html file, you should have something like:
 * <div id="root"></div>
 * 
 * This is the "mounting point" - the place where your entire React app
 * will be inserted into the HTML page.
 */
const root = createRoot(document.getElementById("root"));

/**
 * Render the application
 * 
 * This tells React to render your component tree into the root.
 * 
 * root.render() takes JSX (JavaScript XML) as its argument.
 * JSX looks like HTML but it's actually JavaScript that gets transformed
 * into React.createElement() calls.
 * 
 * What happens here:
 * 1. React creates a virtual representation of your UI (Virtual DOM)
 * 2. React compares it with the actual browser DOM
 * 3. React updates only the parts that changed (Reconciliation)
 * 4. The browser re-paints the changed parts
 * 
 * The structure:
 * <StrictMode>      ← Wrapper for development checks
 *   <App />         ← Your main application component
 * </StrictMode>
 * 
 * This means your entire App and all its children will benefit from
 * StrictMode's development warnings and checks.
 */
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * Summary of the flow:
 * 
 * 1. Browser loads index.html
 * 2. index.html has <div id="root"></div> and loads this JavaScript file
 * 3. This file runs and finds that <div id="root">
 * 4. Creates a React root attached to that div
 * 5. Renders the App component (wrapped in StrictMode) into that root
 * 6. App component renders its children (Board, Squares, etc.)
 * 7. React creates the actual DOM elements and inserts them into <div id="root">
 * 8. User sees the tic-tac-toe game in their browser!
 * 
 * After initial render:
 * - When state changes (like clicking a square), React re-renders only
 *   the components affected by that state change
 * - The root.render() method is only called once during initial setup
 * - Subsequent updates are handled automatically by React's reactivity system
 */