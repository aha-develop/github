import { useOutsideAlerter } from "@aha-app/aha-develop-react";
// @ts-ignore
import { usePopper } from "https://cdn.skypack.dev/react-popper";
import { useCallback, useRef, useState } from "react";

export function usePopperAlerter(options) {
  const delay = options.delay || 500;
  const [referenceElement, setReferenceElement] = useState(null);
  const popperElement = useRef(null);
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement.current,
    options
  );
  const [visible, setVisible] = useState(false);
  const allowToggle = useRef(true);

  const toggle = useCallback(
    (/** @type {boolean=} */ value) => {
      if (allowToggle.current) setVisible((v) => value ?? !v);
    },
    [setVisible]
  );

  useOutsideAlerter(
    popperElement,
    () => {
      if (visible) {
        allowToggle.current = false;
        setVisible(false);
        // Hiding the react popper seems super slow for some reason, and it causes
        // another re-render afterwards. When this was 100ms it still caused a
        // click on the toggle button to re-show the popup
        setTimeout(() => {
          allowToggle.current = true;
        }, delay);
      }
    },
    { event: "mouseover" }
  );

  return {
    attributes,
    popperElement,
    /** @type {React.Dispatch<React.SetStateAction<HTMLElement | null>>} */
    setReferenceElement,
    styles,
    toggle,
    visible,
  };
}
