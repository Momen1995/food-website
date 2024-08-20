"use-strict";

const header = document.querySelector("header");
const nav = document.querySelector(".navs");
const allSections = document.querySelector(".section");
const modal = document.querySelector(".modal");
const allBtn = document.querySelectorAll(".btn");
const closBtn = document.querySelector(".btn-close-modal");
const overlay = document.querySelector(".overlay");

//nav height find
const navHeight = nav.getBoundingClientRect().height;

//stick navbar
function sticky(entries, observe) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//section reveal
function revealSection(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove("section-hidden");
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

sectionObserver.observe(allSections);

//modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

allBtn.forEach((btn) => btn.addEventListener("click", openModal));
closBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
