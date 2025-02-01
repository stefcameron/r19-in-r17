import { FC, version } from 'react';
import {
  RenderRootParams,
  RenderRootApi,
  renderRoot,
} from '@monorepo/react-19-utils';
import './Dialog.css';

export interface DialogProps {
  onClose?: () => void;
}

export interface RenderDialogRootParams
  extends Omit<RenderRootParams, 'children' | 'rootId'>,
    DialogProps {}

export type RenderDialogRootApi = RenderRootApi;

export type RenderDialogRoot = (
  params: RenderDialogRootParams
) => RenderDialogRootApi;

const majVer = version.split('.')[0];
const logCtx = `[r${majVer}][Dialog]`;

export const Dialog: FC<DialogProps> = ({ onClose }) => {
  //
  // EVENTS
  //

  const handleCloseClick = () => {
    console.log(`${logCtx} handleCloseClick`);
    onClose?.();
  };

  //
  // RENDER
  //

  return (
    <div className="dialog__shadow">
      <div className="dialog__frame">
        <h2>The Dialog</h2>
        <p>
          Hello from <strong>React {version}</strong>
        </p>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    </div>
  );
};

export const renderDialogRoot: RenderDialogRoot = ({
  rootContainer,
  rootOptions,
  ...props
}) => {
  return renderRoot({
    children: <Dialog {...props} />,
    rootId: 'dialog-root',
    rootContainer,
    rootOptions,
  });
};
