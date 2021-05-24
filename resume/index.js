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

function monthDiff(d1, d2) {
  let months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

function calculateCurrentWorkPeriod() {
  const currentWorkPeriod = document.getElementById('currentWorkPeriod');
  const mon = monthDiff(new Date(2019, 10, 1), new Date());
  const m = mon % 12;
  const y = Math.floor(mon / 12);
  currentWorkPeriod.textContent = (y > 0 ? `${y}yr ` : '') + (m > 0 ? `${m}m+` : '');
}

calculateCurrentWorkPeriod();
