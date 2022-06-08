function stringIsFound(str, obj) {
    if (obj) {
  
      if (Array.isArray(obj)) {
        if (obj.includes(str)) {
          return true;
        }
      }
  
      else if (typeof obj === 'object') {
        if (obj[str]) {
          return true
        }
      }
  
      else if (obj === str) {
        return true;
      }
    }

    return false;
  }

  export default stringIsFound;