"use strict";

(function () {
  window.VerticalSlider = function (element, opts) {
    var _this2 = this;

    this.slides = new Array();
    this.scrollLocked = false;
    this.activeSlide = null;
    this.wheelLocked = false;
    var defaults = {
      offset: 0,
      delay: 2000,
      duration: 1000,
      rootMargin: '-20%'
    };
    var scrollIndex = 0;

    if (opts === undefined) {
      opts = {};
    }

    init.call(this, element, opts);
    setDefaults.call(this, defaults, opts);
    configure.call(this, opts);
    var observerOpts = {
      rootMargin: this.rootMargin
    };

    var insersectionCallBack = function insersectionCallBack(element) {
      if ((element.getAttribute('data-index') == 0 || element.getAttribute('data-index') == _this2.slides.length - 1) && !_this2.scrollLocked) {
        var _this = _this2;
        _this2.activeSlide = element;
        _this2.wheelLocked = false;

        _this2.activeSlide.classList.add('active');

        scrollIndex = element.offsetTop;
        toggleScrollState();
        $('html,body').animate({
          scrollTop: _this.activeSlide.offsetTop + _this.offset
        }, _this.duration);

        var wheelCallback = function wheelCallback(e) {
          var delta = (e.deltaY || -e.wheelDelta || e.detail) >> 10 || 1;
          if (_this.wheelLocked) return;
          var nextSlide = null;

          if (delta > 0) {
            var nextIndex = parseInt(_this.activeSlide.getAttribute('data-index')) + 1;
            var nextSlide = nextIndex === _this.slides.length ? null : _this.slides[nextIndex];
          } else {
            var nextIndex = parseInt(_this.activeSlide.getAttribute('data-index') - 1);
            var nextSlide = nextIndex === -1 ? null : _this.slides[nextIndex];
          }

          if (null === nextSlide) {
            _this.wheelLocked = true;
            $('html,body').animate({
              scrollTop: _this.activeSlide.offsetTop + $(_this.activeSlide).innerHeight() * (delta < 0 ? -1 : 1) + _this.offset
            }, _this.duration);
            document.removeEventListener('wheel', wheelCallback);
            toggleScrollState();
            return;
          }

          $('html,body').animate({
            scrollTop: nextSlide.offsetTop + _this.offset
          }, _this.duration);
          scrollIndex = nextSlide.offsetTop;

          _this.activeSlide.classList.remove('active');

          setTimeout(function () {
            nextSlide.classList.add('active');
          }, _this.duration);
          _this.activeSlide = nextSlide;
          _this.wheelLocked = true;
          setTimeout(function () {
            _this.wheelLocked = false;
          }, _this.delay);
        };

        document.addEventListener('wheel', wheelCallback);
      }
    };

    var _self = this;

    var scrollCallback = function scrollCallback(e) {
      window.scrollTo(0, scrollIndex + _self.offset);
    };

    var scrollOffset = this.offset;

    function toggleScrollState() {
      if (!this.scrollLocked) {
        this.wheelLocked = true;

        var _self = this;

        setTimeout(function () {
          _self.wheelLocked;
        }, 2000);
        this.scrollLocked = true;
        document.addEventListener('scroll', scrollCallback);
      } else {
        this.scrollLocked = false;
        document.removeEventListener('scroll', scrollCallback);
      }
    }

    function init(element, opts) {
      var _this3 = this;

      element.forEach(function (slide) {
        _this3.slides.push(slide);
      });
      this.Observer = new IntersectionObserver(function (entries, observer) {
        var _this4 = this;

        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var slide = entry.target;
            insersectionCallBack.call(_this4, slide);
          }
        });
      }, observerOpts);
      var index = 0;
      this.slides.forEach(function (slide) {
        _this3.Observer.observe(slide);

        slide.setAttribute('data-index', index++);
      });
    }
    /* Define opts by defaults */


    function setDefaults(defaults, opts) {
      for (var key in defaults) {
        if (!has.call(opts, key)) {
          opts[key] = defaults[key];
        }
      }
    }
    /* object send has key */


    function has(key) {
      for (var _key in this) {
        if (_key === key) return true;
      }

      return false;
    }
    /* Configure object with options */


    function configure(opts) {
      for (var key in opts) {
        if (has.call(defaults, key)) {
          this[key] = opts[key];
        }
      }
    }
  };
})();

var slides = document.querySelectorAll('.slide');
var slider = new VerticalSlider(slides, {});