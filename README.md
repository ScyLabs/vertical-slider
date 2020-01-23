# VerticalSlider

Vertical scroll-blocker slider


## Usage

### Load the javascript in your html 
```html
<script src="path_to_script_loader_folter/dist/VerticalSlider.min.js" type="text/javascript"></script>
```
### Initialize VerticalSlider object
```javascript
var slides = document.querySelectorAll('.slide');
var options = {
  offset: 0,
  delay: 2000,
  duration: 1000,
  rootMargin: "-20%"
};
var verticalSlider = new VerticalSlider(slides,options);
```    
## License
[MIT](https://choosealicense.com/licenses/mit/)
