export default {
  methods: {
    // ------------------------------------------------------------------------------
    // GLOBAL HELPER
    // ------------------------------------------------------------------------------
    setZIndex (el, zIndex) {
      //console.log(' ')
      //console.log('---> setZIndex called:')
      //console.log('     el =', el)
      //console.log('     zIndex =', zIndex)
      el.style.zIndex = zIndex
    }
  }
}
