let main = document.getElementById("main");
let reference = document.getElementById("sideProjectSection");

function changeView(hash) {
  let child
  switch (window.location.hash) {
    case "#linuxExperience": {
      child = document.getElementById("webSection");
      break;
    }
    case "#webExperience": {
      child = document.getElementById("linuxSection");
      break;
    }
  }
  if (child) {
    main.insertBefore(child, reference);
  }
}

changeView(window.location.hash);

window.addEventListener("hashchange", changeView, false);

