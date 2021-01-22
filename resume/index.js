const main = document.getElementById("main");
const sideProjectSection = document.getElementById("sideProjectSection");
const webSection = document.getElementById('webSection');
const linuxSection = document.getElementById('linuxSection');

function changeView(hash) {
  let child
  switch (hash) {
    case "#linuxExperience": {
      child = webSection;
      break;
    }
    case "#webExperience": {
      child = linuxSection;
      break;
    }
  }
  if (child) {
    main.insertBefore(child, sideProjectSection);
  }
}

changeView(window.location.hash);

window.addEventListener("hashchange", changeView, false);

[webSection, linuxSection, sideProjectSection].forEach(section => {
  const sectionTitle = section.querySelector('.sectionTitle');
  const sectionContent = section.querySelector('.sectionContent');
  if (section !== webSection) {
    sectionContent.classList.add('hidden');
    sectionTitle.classList.add('clickMe');
  }
  sectionTitle.addEventListener('click', () => {
    sectionContent.classList.toggle('hidden');
    sectionTitle.classList.toggle('clickMe');
  });
});
