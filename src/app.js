// ---------------------------------------------------- Smooth Scroll ----------------------------------------------------- //
// Agrega el evento de clic a cada enlace interno
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href^='#']");

  // Agrega el evento de clic a cada enlace
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      // Si el destino existe, haz un desplazamiento suave hacia él
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// ----------------------------------------------------- Sticky Navbar ----------------------------------------------------- //
const navbar = document.querySelector(".header_nav");
const headerNavLogo = document.querySelector(".header_nav_logo");

const stickyNavbar = () => {
  // Cuando pase el hero el navbar se queda pegado
  if (window.pageYOffset > 600) {
    navbar.classList.add("sticky");
    // If the navbar is sticky, change the logo max-width to 200px
    headerNavLogo.style.maxWidth = "60px";
  } else {
    navbar.classList.remove("sticky");
    // If the navbar is not sticky, change the logo max-width to 100px
    headerNavLogo.style.maxWidth = "100px";
  }
};
window.onscroll = function () {
  stickyNavbar();
};

// ---------------------------------------------------- Reveal Sections ----------------------------------------------------- //
// Reveal sections
const allSections = document.querySelectorAll(".container");

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    // Make smooth reveal to the section and blur effect
    entry.target.style.transition =
      "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    entry.target.style.opacity = "1";

    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// // ---------------------------------------------------- Conoce Mas ----------------------------------------------------- //
// const btnKnowMore = document.querySelector(".contact");

// // Smooth scroll to the benefits section - 20rem
// btnKnowMore.addEventListener("click", (e) => {
//   e.preventDefault();
//   const benefitsSection = document.querySelector("#benefits");
//   benefitsSection.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//     offset: offset,
//   });
// }
// );

// ---------------------------------------------------- Active Link ----------------------------------------------------- //
// Obtiene todos los links de la navbar
const links = document.querySelectorAll(".header_nav_link");
/**
 * Detecta cuando se entra a una seccion y cambia el color del link activo
 * @param {IntersectionObserverEntry[]} entries - Las entradas del observer
 * @returns {void}
 */
const activeLinkSectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Si la seccion no es visible, no hacer nada
      if (!entry.isIntersecting) return;

      // Si la seccion es visible, cambiar el color del link activo
      const id = entry.target.getAttribute("id");
      links.forEach((link) => {
        // Remover la clase active de todos los links
        link.classList.remove("header_nav_item-active");

        // Si el link tiene el mismo id que la seccion, agregar la clase active
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("header_nav_item-active");
        }
      });
    });
  },
  // thresahold => 0.2 => 20% de la seccion visible
  { root: null, threshold: 0.2 }
);

// Agrega el observer a cada seccion
links.forEach((link) => {
  // Obtiene el id de la seccion a la que apunta el link
  const href = link.getAttribute("href").substring(1);
  // Busca en el DOM la seccion con el id correspondiente
  const section = document.getElementById(href);
  // Si la seccion existe, agregar el observer
  if (section) {
    activeLinkSectionObserver.observe(section);
  }
});

// ---------------------------------------------------- Calendario para el input date ----------------------------------------------------- //
// const dateInputElement = document.querySelector(".contact_date");
// const datePicker = new Pikaday({
//   field: dateInputElement,
//   format: "YYYY-MM-DD",
//   minDate: new Date(), // Fecha mínima es hoy
//   onSelect: function (date) {
//     dateInputElement.value = this.getMoment().format("YYYY-MM-DD");
//   },
// });

// ---------------------------------------------------- Send mails ----------------------------------------------------- //
const form = document.querySelector(".form");

// Obtener los inputs del formulario
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("number");
const dateInput = document.getElementById("date");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Obtener los valores sanitizados de los inputs
  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  // Validar el formato del email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return;
  }
  // Validar el formato del número
  const numberRegex = /^\d+$/;
  if (!numberRegex.test(numberInput.value)) {
    alert("Por favor, ingresa un número de teléfono válido.");
    return;
  } 
  const number = numberInput.value.trim();
  // Validar el formato de la fecha
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateInput.value)) {
    alert("Por favor, ingresa una fecha válida (YYYY-MM-DD).");
    return;
  }
  const date = dateInput.value.trim();

  // Validar los inputs
  if (!name || !lastName || !email || !number || !date) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  // Enviar el formulario
  form.submit();

  // Mostrar un mensaje de éxito
  alert("Formulario enviado con éxito.");
  // Limpiar los inputs
  nameInput.value = "";
  lastNameInput.value = ""; 
  emailInput.value = "";
  numberInput.value = "";
  dateInput.value = "";

});

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();
