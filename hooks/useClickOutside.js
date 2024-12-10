//we pass a ref to this function as  container element that we want to watch or track
//pass a cb to be executed when a click occirs outside the refrenced cotnainer
//attach mousedonw event listern in the hook to detecd outside clieck
//we should clean up the event listener
import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside of a specific element
 * @param {Object} ref - The ref of the element you want to detect outside clicks for.
 * @param {Function} onClickOutside - Callback function to execute on outside click.
 */
const useClickOutside = (ref, onClickOutside) => {
    useEffect(() => {
        //when a click occurs,it checks if the event target is not inside the element refrenced by ref
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside()
            }
        }

        //Attach the event listener
        document.addEventListener("mousedown", handleClickOutside)

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [ref, onClickOutside])
}
export default useClickOutside