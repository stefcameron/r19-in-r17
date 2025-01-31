import { FC, version } from 'react';
import { createPortal } from 'react-dom';
import './Dialog.css';

interface Props {
  onClose?: () => void;
}

export const Dialog: FC<Props> = ({ onClose }) => {
  //
  // EVENTS
  //

  const handleCloseClick = () => {
    onClose?.();
  };

  //
  // RENDER
  //

  return createPortal(
    <div className="dialog__shadow">
      <div className="dialog__frame">
        <h2>The Dialog</h2>
        <p>
          Hello from <strong>React {version}</strong>
        </p>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    </div>,
    document.body
  );
};
