document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU HAMBÚRGUER =====
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');

  hamburgerBtn?.addEventListener('click', () => {
    mobileMenu?.classList.add('active');
  });

  closeMenu?.addEventListener('click', () => {
    mobileMenu?.classList.remove('active');
  });

  // ===== PROMO CARROSSEL COM ANIMAÇÃO =====
  const promos = [
    {
      icon: "fa-shoe-prints",
      title: "TÊNIS DE CORRIDA",
      text: "Encontre o seu tênis ideal.",
      link: "#"
    },
    {
      icon: "fa-fire",
      title: "OFERTAS IMPERDÍVEIS",
      text: "Descontos de até 70%.",
      link: "#"
    },
    {
      icon: "fa-shipping-fast",
      title: "FRETE GRÁTIS",
      text: "Para todo o Brasil em compras acima de R$199.",
      link: "#"
    }
  ];

  let currentPromo = 0;
  let promoInterval;

  const promoText = document.getElementById("promoText");

  function renderPromo(index) {
    if (!promoText) return;

    promoText.classList.add("fade-out");

    setTimeout(() => {
      const promo = promos[index];
      promoText.innerHTML = `
        <i class="fas ${promo.icon}"></i>
        <strong>${promo.title}</strong> ${promo.text} <a href="${promo.link}">Saiba Mais</a>
      `;
      promoText.classList.remove("fade-out");
      promoText.classList.add("fade-in");

      setTimeout(() => promoText.classList.remove("fade-in"), 500);
    }, 300);
  }

  function nextPromo() {
    currentPromo = (currentPromo + 1) % promos.length;
    renderPromo(currentPromo);
  }

  function prevPromo() {
    currentPromo = (currentPromo - 1 + promos.length) % promos.length;
    renderPromo(currentPromo);
  }

  function startPromoSlide() {
    promoInterval = setInterval(nextPromo, 5000);
  }

  function resetPromoSlide() {
    clearInterval(promoInterval);
    startPromoSlide();
  }

  renderPromo(currentPromo);
  document.getElementById("nextBtn")?.addEventListener("click", () => {
    nextPromo();
    resetPromoSlide();
  });

  document.getElementById("prevBtn")?.addEventListener("click", () => {
    prevPromo();
    resetPromoSlide();
  });

  startPromoSlide();

  // ===== CARROSSEL DE BOXES (Loop infinito: 1 bloco por vez) =====
  let currentBoxIndex = 0;
  const boxesCarousel = document.getElementById('boxesCarousel');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const totalBoxes = boxesCarousel?.children.length || 0;

  document.getElementById('box-nextBtn')?.addEventListener('click', () => {
    currentBoxIndex = (currentBoxIndex + 1) % totalBoxes;
    updateBoxCarousel();
  });

  document.getElementById('box-prevBtn')?.addEventListener('click', () => {
    currentBoxIndex = (currentBoxIndex - 1 + totalBoxes) % totalBoxes;
    updateBoxCarousel();
  });

  function updateBoxCarousel() {
    const wrapperWidth = carouselWrapper.offsetWidth;
    boxesCarousel.style.transform = `translateX(-${currentBoxIndex * wrapperWidth}px)`;
  }

  window.addEventListener('resize', updateBoxCarousel);
  window.addEventListener('load', updateBoxCarousel);

  // ===== ACCORDION MOBILE - MAIS BUSCADOS =====
  document.querySelectorAll('.accordion-btn').forEach(button => {
    button.addEventListener('click', () => {
      const content = button.nextElementSibling;

      button.classList.toggle('active');

      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });

    const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    this.classList.toggle('active');

    const content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // Suporte para toque no iPhone
  btn.addEventListener('touchstart', function () {
    this.classList.toggle('active');

    const content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
  });

  // ===== ACCORDION FOOTER =====
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const section = header.closest(".footer-section");
      const isActive = section.classList.contains("accordion-active");

      document.querySelectorAll(".footer-section").forEach(sec => {
        sec.classList.remove("accordion-active");
      });

      if (!isActive) {
        section.classList.add("accordion-active");
      }
    });
  });
});


