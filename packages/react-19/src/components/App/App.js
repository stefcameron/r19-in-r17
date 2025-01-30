import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from '../Dialog/Dialog';
import './App.css';

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
    console.log('[r19][App] handleOpenClick');
    setShow(true);
  };

  const handleDialogClose = () => {
    setShow(false);
  };

  //
  // EFFECTS
  //

  //
  // RENDER
  //

  return (
    <>
      <div className="app" inert={show}>
        <title>{document.title}</title>
        <meta
          name="keywords"
          content="react, template, typescript, javascript"
        />
        <section>
          <h1>React 19 Test Container</h1>
          <button onClick={handleOpenClick}>Open Dialog</button>
        </section>
      </div>
      {show &&
        createPortal(<Dialog onClose={handleDialogClose} />, document.body)}
    </>
  );
};
