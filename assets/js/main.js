// Swiper.js slider
document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".gallery-slider", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      },
    });
  });
  

  
  
//scrolling or navigation
  document.querySelectorAll('.navbar .dropdown > a').forEach(drop => {
    drop.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault(); // Prevent scrolling
        const submenu = this.nextElementSibling;
        submenu.classList.toggle('dropdown-active');
      }
    });
  });


  

  document.addEventListener('DOMContentLoaded', function () {
    // === Topbar Hide on Scroll ===
    let lastScrollTop = 0;
    const topbar = document.getElementById('topbar');
    const header = document.getElementById('header');
  
    if (topbar && header) {
      window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
        if (currentScroll > lastScrollTop && currentScroll > 50) {
          topbar.style.transform = "translateY(-100%)";
          header.classList.add("header-scrolled");
        } else {
          topbar.style.transform = "translateY(0)";
          if (currentScroll < 50) {
            header.classList.remove("header-scrolled");
          }
        }
  
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      }, false);
    }
  
    // === Mobile Nav Toggle ===
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('#navbar ul');
  
    if (toggle && navList) {
      toggle.addEventListener('click', function () {
        navList.classList.toggle('show');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
    }
  
    // === Dropdown Toggle for Mobile ===
    document.querySelectorAll('.navbar .dropdown > a').forEach(drop => {
      drop.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
          e.preventDefault();
          const submenu = this.nextElementSibling;
  
          // Close others
          document.querySelectorAll('.navbar .dropdown ul').forEach(ul => {
            if (ul !== submenu) ul.classList.remove('dropdown-active');
          });
  
          submenu.classList.toggle('dropdown-active');
        }
      });
    });
  });
  