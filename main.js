"use-strict";

const header = document.querySelector("header");
const nav = document.querySelector(".navs");
const allSections = document.querySelector(".section");

//nav height find
const navHeight = nav.getBoundingClientRect().height;

//stick navbar
function sticky(entries) {
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
function revealSection(entries){
  const [entry] = entries;
  console.log(entry)

  if(entry.isIntersecting) entry.target.classList.remove("section-hidden");
}
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold : 0.2,
})

 sectionObserver.observe(allSections)


