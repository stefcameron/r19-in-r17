export type {
  DialogProps,
  RenderDialogRoot,
  RenderDialogRootParams,
  RenderDialogRootApi,
} from './Dialog/Dialog';

// NOTE: do not export the Dialog component itself since it's meant to be rendered
//  by the bundled version of React
export { renderDialogRoot } from './Dialog/Dialog';
