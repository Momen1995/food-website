"use-strict";
import foodItems from "./data.js";

console.log(foodItems);
const header = document.querySelector("header");
const nav = document.querySelector(".navs");
const allSections = document.querySelectorAll(".section");
const modal = document.querySelector(".modal");
const allBtn = document.querySelectorAll(".btn");
const closBtn = document.querySelector(".btn-close-modal");
const overlay = document.querySelector(".overlay");
const navItemContainer = document.querySelector(".nav-items");
const toogleBtn = document.querySelector(".nav-toggle");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const menuCard = document.querySelector(".menu-card");

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
  threshold: 0,
  rootMargin: "50px",
});

// sectionObserver.observe(allSections);
allSections.forEach((section) => sectionObserver.observe(section));

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

document.addEventListener("keydown", function (e) {
  console.log(e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//scroll behavior
navItemContainer.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav-link")) {
    const attr = e.target.getAttribute("href");
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

//nav-toogle
toogleBtn.addEventListener("click", function () {
  if (navItemContainer.classList.contains("nav-open")) {
    navItemContainer.classList.remove("nav-open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navItemContainer.classList.add("nav-open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navItemContainer.addEventListener("click", function () {
  navItemContainer.classList.contains("nav-open") &&
    navItemContainer.classList.remove("nav-open");
  document.querySelector("html").style.overflow = "visible";
});

//slides
let currentSlide = 0;
let maxSlide = slides.length - 1;

function slideChange(cs) {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - cs)}%)`;
  });
}

slideChange(0);

function preSlide() {
  if (currentSlide === 0) currentSlide = maxSlide;
  else currentSlide--;
  slideChange(currentSlide);
}

function nextSlide() {
  if (currentSlide === maxSlide) currentSlide = 0;
  else currentSlide++;
  slideChange(currentSlide);
}

btnLeft.addEventListener("click", preSlide);
btnRight.addEventListener("click", nextSlide);

//menu
foodItems.forEach((food) => {
  const html = `
    <div class="menu-cards">
      <div class="image-container">
      <img src=${food.image} alt=${food.name}>
      </div>
      <div class="card-content">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="card-content-detail">
          <p><strong>Price: $${food.price}</strong></p>
          <div class="rating">⭐ ${food.rating} (${food.reviews} reviews)</div>
        </div>
        <button data-id=${food.id} class="menu-btn">Order Now</button>
      </div>
    </div>
   `;

  menuCard.insertAdjacentHTML("afterbegin", html);
});
