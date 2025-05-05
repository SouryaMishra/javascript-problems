   const throttle = (callback, delay) => {
      let isBusy = false;
      
      return (...args) => {
        if(isBusy) return;
        callback.apply(this, args);
        isBusy = true;
        setTimeout(() => isBusy = false, delay);
      }
   
   }
