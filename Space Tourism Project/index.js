const log = console.log;
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// when someone clicks the hamburger button
// if the nav is closed, open it and vice versa
navToggle.addEventListener("click", () => {
  const visiblity = nav.getAttribute("data-visible");
  if (visiblity === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Json data for manipulating the DOM
const jsonData = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  return data;
};

/* ========================================== */
// destination page manipulation
/* ========================================== */

const destination = document.querySelector(".grid-container--destination");
const destinationBtns = document.querySelectorAll(".tab-list button");

const changePanel = (el) => {
  // remove focus from the previous selected element
  el.parentElement
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  // add focus on the clicked element
  el.setAttribute("aria-selected", true);
};

// Setting underline on button click
destinationBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    changePanel(btn);

    // changing the destination page content
    const img = document.querySelector(".grid-container--destination img");
    const desc = document.querySelector(".destination-info");
    const distance = document.querySelectorAll(".destination-meta p");

    jsonData().then((data) => {
      const destinationData = data.destinations;

      // selecting the page content and changing it on click
      if (destinationData[i].name === btn.textContent) {
        img.setAttribute("src", destinationData[i].image.webp);
        desc.children[0].textContent = destinationData[i].name;
        desc.children[1].textContent = destinationData[i].description;
        distance[0].textContent = destinationData[i].distance;
        distance[1].textContent = destinationData[i].travel;
      }
    });
  });
});

/* ========================================== */
// crew page manipulation
/* ========================================== */

const dots = document.querySelectorAll(".grid-container--crew button");

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    changePanel(dot);

    const role = document.querySelector(".crew-details h2");
    const name = document.querySelector(".crew-details p");
    const bio = document.querySelector(".crew-details > p");
    const img = document.querySelector(".grid-container--crew img");

    jsonData().then((data) => {
      const crewData = data.crew;

      if (dot.textContent.trim() === crewData[i].role) {
        role.textContent = crewData[i].role;
        name.textContent = crewData[i].name;
        bio.textContent = crewData[i].bio;
        img.setAttribute("src", crewData[i].image.webp);
      }
    });
  });
});

/* ========================================== */
// tech page manipulation
/* ========================================== */

const techBtns = document.querySelectorAll(".grid-container--tech button");

techBtns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    changePanel(btn);

    const name = document.querySelector(".tech-details p");
    const desc = document.querySelector(".tech-details > p");
    const img = document.querySelector("picture");

    jsonData().then((data) => {
      const techData = data.technology;

      if (btn.children[0].textContent === techData[i].name) {
        name.textContent = techData[i].name;
        desc.textContent = techData[i].description;
        img.children[0].setAttribute("srcset", techData[i].image.landscape);
        img.children[1].setAttribute("src", techData[i].image.portrait);
      }
    });
  });
});