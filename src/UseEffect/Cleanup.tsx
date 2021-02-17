import { useEffect } from "react"

export function Cleanup() {

  useEffect((): any => {
    const mouseOverEventHandler = (): void => {
      console.log("on mouseover");
    }
    document.addEventListener("mouseover", mouseOverEventHandler);
    return function () {
      document.removeEventListener("mouseover", mouseOverEventHandler);
    }
  })

  return (
    <div>
      Over me!
    </div>
  );
}