import { useState } from 'react';
import './App.css';

// TODO: const loadDialog = () => import('@monorepo/react-19');

export const App = () => {
  //
  // STATE
  //

  const [show, setShow] = useState(false);

  //
  // REFS
  //

  //
  // EVENTS
  //

  const handleOpenClick = () => {
    console.log('[r17][App] handleOpenClick');
    setShow(true);
  };

  // TODO
  // const handleDialogClose = () => {
  //   console.log('[r17][App] handleDialogClose');
  //   setShow(false);
  // };

  //
  // EFFECTS
  //

  //
  // RENDER
  //

  const appProps = show ? { inert: 'true' } : undefined;

  return (
    <>
      <div className="app" {...appProps}>
        <title>{document.title}</title>
        <meta
          name="keywords"
          content="react, template, typescript, javascript"
        />

        <h1>React 17 App</h1>

        <section>
          <button onClick={handleOpenClick}>Open Dialog</button>
        </section>
      </div>
    </>
  );
};
