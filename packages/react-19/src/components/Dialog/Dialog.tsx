import { FC } from 'react';
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

  return (
    <div className="dialog__shadow">
      <div className="dialog__frame">
        <h2>The Dialog</h2>
        <p>Hello!</p>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    </div>
  );
};
