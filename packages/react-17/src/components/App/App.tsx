import { useState, useEffect, version } from 'react';
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

  //
  // EFFECTS
  //

  useEffect(() => {
    if (show) {
      const showDialog = async () => {
        const { renderDialogRoot } = await import(
          /* webpackChunkName: "react-19" */ '@monorepo/react-19'
        );
        const api = renderDialogRoot({
          onClose() {
            console.log(`${logCtx} handleDialogClose`);
            api.unmount();
            setShow(false);
          },
        });
      };
      void showDialog();
    }
  }, [show]);

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

        <h1>React {version} App</h1>

        <section>
          <button onClick={handleOpenClick}>Open Dialog</button>
        </section>
      </div>
    </>
  );
};
