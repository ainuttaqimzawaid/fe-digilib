import { useEffect } from "react";

export default function useClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Jika klik terjadi di dalam elemen, abaikan
            if (!ref.current || ref.current.contains(event.target)) return;
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        // document.addEventListener("touchstart", listener);

        // Cleanup
        return () => {
            document.removeEventListener("mousedown", listener);
            // document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
