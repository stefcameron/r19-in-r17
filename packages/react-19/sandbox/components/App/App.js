import { useState, version } from 'react';
import { createPortal } from 'react-dom';
import { Dialog } from '../../../src/Dialog/Dialog';
import './App.css';

const majVer = version.split('.')[0];
const logCtx = `[r${majVer}][App]`;

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
    console.log(`${logCtx} handleOpenClick`);
    setShow(true);
  };

  const handleDialogClose = () => {
    console.log(`${logCtx} handleDialogClose`);
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

        <h1>React {version} Test Container</h1>

        <section>
          <button onClick={handleOpenClick}>Open Dialog</button>
        </section>
      </div>
      {show && createPortal(<Dialog onClose={handleDialogClose} />, document.body)}
    </>
  );
};
