(function ($) {
  'use strict';

  $(window).scroll(function () {
    const scroll = $(window).scrollTop();
    const box = $('.header-text').height();
    const header = $('header').height();

    if (scroll >= box - header) {
      $('header').addClass('background-header');
    } else {
      $('header').removeClass('background-header');
    }
  });

  $('.filters ul li').click(function () {
    $('.filters ul li').removeClass('active');
    $(this).addClass('active');
  });
  const Accordion = {
    settings: {
      // Expand the first item by default
      first_expanded: false,
      // Allow items to be toggled independently
      toggle: false
    },

    openAccordion: function (toggle, content) {
      if (content.children.length) {
        toggle.classList.add('is-open');
        const finalHeight = Math.floor(content.children[0].offsetHeight);
        content.style.height = finalHeight + 'px';
      }
    },

    closeAccordion: function (toggle, content) {
      toggle.classList.remove('is-open');
      content.style.height = 0;
    },

    init: function (el) {
      const _this = this;

      // Override default settings with classes
      let isFirstExpanded = _this.settings.first_expanded;
      if (el.classList.contains('is-first-expanded')) isFirstExpanded = true;
      let isToggle = _this.settings.toggle;
      if (el.classList.contains('is-toggle')) isToggle = true;

      // Loop through the accordion's sections and set up the click behavior
      const sections = el.getElementsByClassName('accordion');
      const allToggles = el.getElementsByClassName('accordion-head');
      const allContents = el.getElementsByClassName('accordion-body');
      for (let i = 0; i < sections.length; i++) {
        const toggle = allToggles[i];
        const content = allContents[i];

        // Click behavior
        toggle.addEventListener('click', function (e) {
          if (!isToggle) {
            // Hide all content areas first
            for (let a = 0; a < allContents.length; a++) {
              _this.closeAccordion(allToggles[a], allContents[a]);
            }

            // Expand the clicked item
            _this.openAccordion(toggle, content);
          } else {
            // Toggle the clicked item
            if (toggle.classList.contains('is-open')) {
              _this.closeAccordion(toggle, content);
            } else {
              _this.openAccordion(toggle, content);
            }
          }
        });

        // Expand the first item
        if (i === 0 && isFirstExpanded) {
          _this.openAccordion(toggle, content);
        }
      }
    }
  };

  (function () {
    // Initiate all instances on the page
    const accordions = document.getElementsByClassName('accordions');
    for (let i = 0; i < accordions.length; i++) {
      Accordion.init(accordions[i]);
    }
  })();

  $('.owl-service-item').owlCarousel({
    items: 3,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });

  $('.owl-courses-item').owlCarousel({
    items: 4,
    loop: true,
    dots: true,
    nav: true,
    autoplay: true,
    margin: 30,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
    $('.menu-trigger').on('click', function () {
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }

  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      let target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        const width = $(window).width();
        if (width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);
        }
        $('html,body').animate({
          scrollTop: (target.offset().top) - 80
        }, 700);
        return false;
      }
    }
  });

  // Page loading animation
  $(window).on('load', function () {
    if ($('.cover').length) {
      $('.cover').parallax({
        imageSrc: $('.cover').data('image'),
        zIndex: '1'
      });
    }

    $('#preloader').animate({
      opacity: '0'
    }, 600, function () {
      setTimeout(function () {
        $('#preloader').css('visibility', 'hidden').fadeOut();
      }, 300);
    });
  });

  const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

  // Open/Close Submenus
  if (dropdownOpener.length) {
    dropdownOpener.each(function () {
      const _this = $(this);

      _this.on('tap click', function (e) {
        const thisItemParent = _this.parent('li');
        const thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

        if (thisItemParent.hasClass('has-sub')) {
          const submenu = thisItemParent.find('> ul.sub-menu');

          if (submenu.is(':visible')) {
            submenu.slideUp(450, 'easeInOutQuad');
            thisItemParent.removeClass('is-open-sub');
          } else {
            thisItemParent.addClass('is-open-sub');

            if (thisItemParentSiblingsWithDrop.length === 0) {
              thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                submenu.slideDown(250, 'easeInOutQuad');
              });
            } else {
              thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                submenu.slideDown(250, 'easeInOutQuad');
              });
            }
          }
        }

        e.preventDefault();
      });
    });
  }
})(window.jQuery);
