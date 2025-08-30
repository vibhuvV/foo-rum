import {
  useCallback,
  useLayoutEffect,
  type FC,
  type PropsWithChildren,
} from "react";
import { createPortal } from "react-dom";

type DialogProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
};

const Dialog: FC<DialogProps> = ({ children, onClose, open }) => {
  const handleDialogContentClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    },
    [],
  );

  useLayoutEffect(() => {
    const handleEscapePress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapePress);

    return () => document.removeEventListener("keydown", handleEscapePress);
  }, [onClose]);

  return open
    ? createPortal(
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-700/60 flex justify-center items-center z-[1000]"
          onClick={onClose}
        >
          <div className="shadow-xl" onClick={handleDialogContentClick}>
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default Dialog;
