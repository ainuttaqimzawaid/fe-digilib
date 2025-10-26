// hooks/useClickOutside.js
import { useEffect } from "react";

export default function useClickOutside(ref, handler, exceptionRef) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                !ref.current ||
                ref.current.contains(event.target) ||
                (exceptionRef?.current && exceptionRef.current.contains(event.target))
            ) {
                return;
            }
            handler(event);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, handler, exceptionRef]);
}
