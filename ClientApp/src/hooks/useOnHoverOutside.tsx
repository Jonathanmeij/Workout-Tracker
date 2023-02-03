import { useEffect } from "react";

type UseOnEventOutsideArgs = {
    ref: React.RefObject<HTMLElement>;
    event: "click" | "mouseover";
    handler: (event: MouseEvent) => void;
};

/**
 * @function useOnEventOutside
 * @description A hook that runs a function whenever a given event is triggered outside of the element specified by a ref.
 * @param {UseOnEventOutsideArgs["ref"]} ref - The ref to the element to check for the event outside of.
 * @param {UseOnEventOutsideArgs["event"]} event - The event to listen for.
 * @param {UseOnEventOutsideArgs["handler"]} handler - The function to run when the event is triggered outside of the element.
 * @returns {void}
 */

export function useOnEventOutside(
    ref: UseOnEventOutsideArgs["ref"],
    event: UseOnEventOutsideArgs["event"],
    handler: UseOnEventOutsideArgs["handler"]
) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            handler(event);
        };
        document.addEventListener(event, listener);
        return () => {
            document.removeEventListener(event, listener);
        };
    }, [ref, event, handler]);
}
