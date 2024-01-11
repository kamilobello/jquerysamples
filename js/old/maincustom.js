const $ = (args) => {

  let elements = {};

  if(typeof args === 'function') {
    document.addEventListener('DOMContentLoaded', args);
    return;
  }

  if(args instanceof Document) {
    elements = args;
    elements.ready = (callback) => {
      document.addEventListener('DOMContentLoaded', callback)
    }
    return elements;
  }

  if(args instanceof HTMLElement || args instanceof Element) {
    elements = args;
    elements.hide = () => {
      args.style['display'] = 'none' ;
    }
  }

  if(typeof args === 'string') {
    elements = document.querySelectorAll(args);

    elements.click = (callback) => {
      elements.forEach((element, index) => {        
        element.addEventListener('click', callback)
      });
      return elements;
    }

    elements.on = (event, callback) => {
      elements.forEach((element, index) => {        
        element.addEventListener(event, callback)
      });
      return elements;
    }

    elements.first = () => {
      elements = document.querySelector(args);

      elements.hide = () => {
        elements.style['display'] = 'none' ;
        return elements;
      }

      elements.show = (duration, callback) => {
        setTimeout(() => {
          elements.style['display'] = 'block' ;
          callback();
        }, duration)
        return elements;
      }
      return elements;
    }
  }

  return elements;

}

$(document).ready(function(){
  $("p").click(function(){
    $(this).hide();
  });
});

$(() => {
  console.log('Document loaded');
  $('button').on('click', () => {
    $("p").first().hide().show(5000, function() {
      // Animation complete.
    });
  });
})