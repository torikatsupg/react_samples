import React, { useEffect, useState } from 'react';

export function FirstExample() {
 const [state, setState] = useState(0);

 useEffect(() => {
    document.title = String(state);
 })

 return <div>
   <p>{ state } </p>
   <button onClick={() => setState(state + 1)}>
     increment
   </button>
 </div>
}