export default {
  methods: {
    // ------------------------------------------------------------------------------
    // DEBUG
    // ------------------------------------------------------------------------------
    checkDataAvailability (where) {
      console.group('%c!!! TEST', 'color: black,background-color: orange∞')
      console.log('In ' + where + ': is data available?')

      if (this.isStringDataAvailable) {
        console.log('%cthis.isStringDataAvailable = ' + this.isStringDataAvailable, 'color: lightseagreen')
      } else {
        console.log('%cthis.isStringDataAvailable =' + this.isStringDataAvailable, 'color: lightsalmon')
      }

      if (this.windowWidth) {
        console.log('%cthis.windowWidth = ' + this.windowWidth, 'color: lightseagreen')
      } else {
        console.log('%cthis.windowWidth = ' + this.windowWidth, 'color: lightsalmon')
      }

      if (this.$store) {
        console.log('%cthis.$store = ' + this.$store, 'color: lightseagreen')
      } else {
        console.log('%cthis.$store = ' + this.$store, 'color: lightsalmon')
      }

      console.groupEnd()
    },
    checkVars () {
      console.group(':: CHECK VARS')
      console.log('this.getActiveBP =', this.getActiveBP)
      console.log('this.getAsideVisible =', this.getAside)
      console.log('this.getNavMainVisible =', this.getNavMainVisible)
      console.log('this.getMainContentIsBlurred =', this.getMainContentIsBlurred)

      console.log('this.getCreateAnimationRefsForPreMountedStatus =', this.getCreateAnimationRefsForPreMountedStatus)
      console.log('this.getCreateAnimationRefsForUserInteraction =', this.getCreateAnimationRefsForUserInteraction)
      console.groupEnd()
    }
  }
}
