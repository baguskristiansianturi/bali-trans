document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
      });
    });

  }


  /*
   * FAQ
   * Keep only one FAQ open at a time.
   */

  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach(other => {
        if (other !== item) {
          other.removeAttribute("open");
        }
      });

    });

  });


  /*
   * Smooth anchor navigation
   */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});