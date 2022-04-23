import { TweenMax, TimelineMax } from 'gsap'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // GSAP HELPER:
    // ------------------------------------------------------------------------------
    // Abstract tweener function: TODO: We need a callback property!
    tweenEl (domElem, visibility, durationVal = 'global', delayVal = 'global', reverse = false) {
      //console.log(' ')
      //console.groupCollapsed('> tweenEl invoked')
      //console.log('domElem.el =', domElem.el);

      // hidden = standard
      let tweenParams = '' // domElem.tweenParamsTo.hidden; // "hidden", "visible", "intro"

      // overwrite
      if (visibility === 'visible') {
        tweenParams = 'visible' // domElem.tweenParamsTo.visible;
        domElem.status = 'visible'
      } else if (visibility === 'intro') {
        tweenParams = 'intro'
        domElem.status = 'intro'
      } else {
        tweenParams = 'hidden'
        domElem.status = 'hidden'
      }

      //console.log("      domElem.status =", domElem.status )
      //console.log("      tweenParams =", tweenParams)

      let dur, delay

      if (durationVal && durationVal !== 'global') {
        dur = durationVal
      } else {
        dur = this.$options.settings.gsapGlobals.standardAnimationParams.duration
      }
      if (delayVal && delayVal !== 'global') {
        delay = delayVal
      } else {
        delay = this.$options.settings.gsapGlobals.standardAnimationParams.delay
      }

      // Create the tween
      let tl = new TimelineMax({
        paused: true
      })
      tl.to(domElem.el, dur, domElem.tweenParamsTo[tweenParams], delay)
      tl.play()

      return tl

      // console.groupEnd()
    },
    // ------------------------------------------------------------------------------
    // Save GSAP animation, only that way "reverse" can be used.
    // ------------------------------------------------------------------------------
    // called from appear or enter
    createAnimationRefsForPreMountedStatus () {
      // console.group('> CREATE ANIMATION REFS FOR PRE-MOUNTED STATUS');

      if (!this.animatLogo) {
        // console.log('create this.animatLogo');
        // The referenced timeline function must be paused and must not have "play()" invoked
        this.animateLogo = this.$refs.Logo.animateLogo()
      }

      // console.groupEnd()
    }
    // Called after afterAppear (because then the DOM needed is ready)
    // createAnimationRefsForUserInteraction() {
    // console.group('> CREATE ANIMATION REFS FOR USER INTERACTION');

    // if(!this.hideAside_tl){
    //   // console.log('create reference for _hideAside_tl, if that timeline exists');
    //   if(this._hideAside_tl){
    //     this.hideAside_tl = this._hideAside_tl()
    //   }
    // }

    // if(!this.showAside_tl){
    //   // console.log('create reference for _showAside_tl, if that timeline exists');
    //   if(this._showAside_tl){
    //     this.showAside_tl = this._showAside_tl()
    //   }
    // }

    // if(!this.showBtnNavMain_tl){
    //   // console.log('create reference for showBtnNavMain_tl, if that timeline exists');
    //   if(this._showNavMain_tl){
    //     this.showBtnNavMain_tl = this._showNavMain_tl()
    //   }
    // }

    // if(!this.hideNavMain_tl){
    //   // console.log('create reference for hideNavMain_tl, if that timeline exists');
    //   if(this._hideNavMain_tl){
    //     this.hideNavMain_tl = this._hideNavMain_tl()
    //   }
    // }

    // console.groupEnd()
    // },
  }
}
