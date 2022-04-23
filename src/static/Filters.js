const Filters = {
  install (Vue) {
    // Replace slashes '/' (e.g. in American Dates) with "-"
    // used e.g. in news to get properly named json file deducted
    // by date and title
    // TODO: improve using 2 params, first for needle, second for replace string
    Vue.filter('replaceSlashes', function (str) {
      if (!str) {
        return ''
      }
      return str.toString().replace(/\//g, '–')
    })

    Vue.filter('replaceSpaces', function (str) {
      if (!str) {
        return ''
      }
      return str.toString().replace(/\s/g, '–')
    })

    Vue.filter('replaceSpecialCharacters', function (str) {
      if (!str) {
        return ''
      }
      return str.toString().replace(/(\/|\s|\.|\[|\]|\{|\}|\?|:|;|!|_)/g, '–')
    })

    Vue.filter('toLowerCase', function (str) {
      if (!str) {
        return ''
      }
      return str.toString().toLowerCase()
    })

    Vue.filter('prependUrl', function (str, path) {
      if (!str) {
        return ''
      }
      return path + '/' + str.toString().toLowerCase()
    })

    // Two-digit numbers (prepended with a '0', qhen under 10) to enumerate a list
    Vue.filter('trackNumber', function (number) {
      let int = number + 1
      return int < 10 ? (int = '0' + int) : int
    })

    // Translate the "value" in seconds to minutes:seconds (00:00)
    Vue.filter('trackTime', function (value) {
      if (!value || typeof value !== 'number') {
        return '00:00'
      }

      let s = parseInt(value % 60)
      let m = parseInt(value / 60)
      // let h = parseInt( value / 60 / 60 )

      s = s < 10 ? '0' + s : s
      m = m < 10 ? '0' + m : m
      // h = h < 10 ? '0'+h : h

      return m + ':' + s
    })

    // Get amount of 'keys' in an object; a bit like length for an array
    Vue.filter('getObjLength', function (obj){
      // console.log("typeof obj =", typeof obj)
      if(typeof obj !== 'object') {return ''}
      return Object.keys(obj).length
    })

    Vue.filter('addObjectLengthToString', function (str1, obj){
      return str1 + Object.keys(obj).length
    })
  }
}

export default Filters
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Filters)
}
