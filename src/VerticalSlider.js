(function(){

    this.VerticalSlider = function(element,opts) {
      
      this.slides = new Array()
     
      this.scrollLocked = false
      this.activeSlide = null
      
      this.wheelLocked = false
      
      
      var defaults = {
        offset: 0,
        delay : 2000,
        duration: 1000,
        rootMargin: '-20%'
      }
      
      var scrollIndex = 0
  
      
  
      if(opts === undefined){
        opts = {}
      }
      init.call(this,element,opts)
      setDefaults.call(this,defaults,opts)
      configure.call(this,opts)
      
      var observerOpts = {
        rootMargin: this.rootMargin,
      }
      
      var insersectionCallBack = (element) => {
        if((element.getAttribute('data-index') == 0 || element.getAttribute('data-index') == this.slides.length - 1) && !this.scrollLocked){
          var _this = this
          
          this.activeSlide = element
          this.wheelLocked = false
          
          this.activeSlide.classList.add('active')
          scrollIndex = element.offsetTop
          toggleScrollState()
          
          $('html,body').animate({
            scrollTop: _this.activeSlide.offsetTop + _this.offset
          }, _this.duration)
          
          var wheelCallback = (e) => {
            var delta = ((e.deltaY || -e.wheelDelta || e.detail) >> 10) || 1;
            if(_this.wheelLocked)
              return;
            var nextSlide = null
            
            if(delta > 0){
              var nextIndex = parseInt(_this.activeSlide.getAttribute('data-index')) + 1
              var nextSlide = (nextIndex === _this.slides.length) ? null : _this.slides[nextIndex]
            } else{
              var nextIndex = parseInt(_this.activeSlide.getAttribute('data-index') -1)
              var nextSlide = (nextIndex === -1) ? null : _this.slides[nextIndex]
            }
            if(null === nextSlide){ 
                _this.wheelLocked = true
                $('html,body').animate({
                  scrollTop: _this.activeSlide.offsetTop + ($(_this.activeSlide).innerHeight() * ((delta < 0) ? -1 : 1 ) ) + _this.offset
                }, _this.duration)
                document.removeEventListener('wheel', wheelCallback)
                toggleScrollState()
                return
            }
            
            
            $('html,body').animate({
              scrollTop: nextSlide.offsetTop + _this.offset
            },_this.duration)
         
  
            scrollIndex = nextSlide.offsetTop
            _this.activeSlide.classList.remove('active')
            
            setTimeout(function(){
              nextSlide.classList.add('active')  
            },_this.duration)
            
            _this.activeSlide = nextSlide
            _this.wheelLocked = true
            
            setTimeout(function(){
              _this.wheelLocked = false
              
            },_this.delay)
          }
          
          document.addEventListener('wheel',wheelCallback)
        }
      }    
      var _self = this;
      var scrollCallback = (e) => {
        
        window.scrollTo(0,scrollIndex + _self.offset)
      }
     
     
      
      var scrollOffset = this.offset
      
      
      function toggleScrollState(){
   
        if(!this.scrollLocked){
          this.wheelLocked = true;
          var _self = this;
          setTimeout(() => {
            _self.wheelLocked
          },_self.delay)
          this.scrollLocked = true
          document.addEventListener('scroll',scrollCallback)
        } else{
          this.scrollLocked = false
          document.removeEventListener('scroll',scrollCallback)
        }
      }
      
      function init(element,opts){ 
        element.forEach((slide) => {
          this.slides.push(slide)
        })
        this.Observer = new IntersectionObserver(function(entries,observer){
          entries.forEach(entry => {
            if(entry.isIntersecting){
              var slide = entry.target
              insersectionCallBack.call(this,slide)
  
            }
          })
        },observerOpts)
        var index = 0 
        this.slides.forEach((slide) => {
          this.Observer.observe(slide)
          slide.setAttribute('data-index',index++)
          
        })
        
      }
      
      /* Define opts by defaults */
      function setDefaults(defaults,opts){
        for(var key in defaults){
          if(!has.call(opts,key)){
            opts[key] = defaults[key]
          }
        }
      }
      /* object send has key */
      function has(key){
        for(var _key in this){
          if(_key === key)
            return true;
        }
        return false;
      }
       /* Configure object with options */
      function configure(opts){ 
        
        for(var key in opts){
          
          if(has.call(defaults,key)){
             this[key] = opts[key]                  
          }
        }
      }
       
    }
   
  })()
