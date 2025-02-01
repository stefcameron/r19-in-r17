import { ReactNode, Children } from 'react';
import { Container, RootOptions, createRoot } from 'react-dom/client';

export interface RenderRootParams {
  /**
   * If empty, nothing renders, and root is not created. If multiple children are given,
   *  they will be rendered in a Fragment. Otherwise, the child is rendered directly.
   */
  children: ReactNode;

  /**
   * Root container. If not specified, a `<div>` is appended to the `document.body`
   *  on render, and removed on unmount. This `div` will use `rootId` as an ID
   *  if `rootId` is specified.
   */
  rootContainer?: Container;

  /**
   * The ID to use for the generated `rootContainer`.
   *
   * 🔺 Ignored if `rootContainer` is truthy.
   */
  rootId?: string;

  /**
   * Root options including various types of error handlers.
   */
  rootOptions?: RootOptions;
}

export interface RenderRootApi {
  /**
   * Unmounts the generated root.
   */
  unmount: () => void;
}

export type RenderRoot = (params: RenderRootParams) => RenderRootApi;

export const renderRoot: RenderRoot = ({
  rootContainer: container,
  rootId,
  rootOptions: options,
  children,
}) => {
  const rootNode: Container = ((): Container => {
    if (container) {
      return container;
    }

    const rootEl = document.createElement('div');
    if (rootId) {
      rootEl.id = rootId;
    }
    document.body.appendChild(rootEl);

    return rootEl;
  })();

  const childCount = Children.count(children);
  if (childCount >= 1) {
    const root = createRoot(rootNode, options);
    root.render(childCount === 1 ? children : <>{children}</>);

    return {
      unmount() {
        root.unmount();
        if (!container) {
          // remove our generated DOM node
          document.body.removeChild(rootNode);
        }
      },
    };
  }

  return {
    unmount() {},
  };
};
