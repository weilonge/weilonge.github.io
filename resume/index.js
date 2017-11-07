
let main = document.getElementById("main");
let reference = document.getElementById("sideProjectSection");
switch (window.location.hash) {
  case "#linuxExperience": {
    let child = document.getElementById("webSection");
    main.insertBefore(child, reference);
    break;
  }
  case "#webExperience": {
    break;
  }
}

