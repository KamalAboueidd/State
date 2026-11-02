
const saveState = JSON.parse(localStorage.getItem('my-app')) || {
    them : "light",
    count : 0
}
 export const state = proxy(saveState);

  subscribe(state , ()=> {
        const currentSnap = snapshot(state);
        localStorage.setItem("my-app", JSON.stringify(currentSnap));
  })
