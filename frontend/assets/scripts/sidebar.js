const hamburguerBtn = document.getElementById('mobile-menu-btn');
const closeSideBarBtn = document.getElementById('close-btn');
const sideBar = document.getElementById('mobile-menu');

function showSideBar() {
  sideBar.classList.add('active');
}

function closeSideBar() {
  sideBar.classList.remove('active');
}

closeSideBarBtn.addEventListener('click', closeSideBar);
hamburguerBtn.addEventListener('click', showSideBar);
