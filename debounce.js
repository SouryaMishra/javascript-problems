  const debounce = (callback, delay) => {
      let timerId;
      
      return (...args) => {
        if(timerId) clearTimeout(timerId);
        
        timerId = setTomeout(() => {
          callback.apply(this, args)
        }, delay)
      }
   
   }
