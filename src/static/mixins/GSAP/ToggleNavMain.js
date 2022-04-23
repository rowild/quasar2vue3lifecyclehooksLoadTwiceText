import { TweenMax, TimelineMax } from 'gsap'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // UI Interaction: Buttons & functions to show/hide navMain
    // ------------------------------------------------------------------------------
    // The bp is injected, when the function is called from _hideAside) et alt. below

    toggleNavMain (evt, bp = null) {
      console.group('> TOGGLE NAV MAIN')

      // The vue-router re-generates the main container, so we cannot use the info saved
      // in $settings. We must re-collect the DOM element each time here.
      let cContentMainEl = document.querySelector('.o-content__main')
      let cContentMainContainerEl = document.querySelector('.o-content__main--container')

      if (bp === null) {
        console.log('bp = null, user clicked button, this.getNavMainVisible =', this.getNavMainVisible)
        if (this.getNavMainVisible === 'visible') {
          this._hideNavMain(cContentMainEl, cContentMainContainerEl)
        } else {
          this._showNavMain(cContentMainEl, cContentMainContainerEl)
        }
      } else {
        console.log('called from another function, so check against active bp first')
        if (
          bp === 'desktopLandscape' ||
          bp === 'desktopMobile' ||
          bp === 'tabletLandscape' ||
          bp === 'tabletPortrait'
        ) {
          //console.log("navMain to", bp)
          this._showNavMain(cContentMainEl, cContentMainContainerEl)
        } else if (bp === 'mobilePortrait' || bp === 'mobilePortrait') {
          //console.log("navMain to", bp)
          this._hideNavMain(cContentMainEl, cContentMainContainerEl)
        }
      }

      console.groupEnd()
    },
    _hideNavMain (cContentMainEl, cContentMainContainerEl) {
      console.group('> HIDE NAV MAIN')
      let ui = this.$options.settings.ui

      // Play the navMain's "show" animation (play())
      this._hideNavMain_tl()

      // Set the navMain param to hidden
      this.setNavMainVisible('hidden')

      // Expand main content area depending on activeBP
      if (this.getActiveBP !== 'mobileLandscape' && this.getActiveBP !== 'mobilePortrait') {
        TweenMax.to(cContentMainEl, 0.45, ui.cContentMain.tweenParamsTo.overrides.navMainHidden)

        // Manipulate radius and drop shadow (=border) of main content area, inner div
        TweenMax.to(cContentMainContainerEl, 0.45, ui.cContentMainContainer.tweenParamsTo.overrides.navMainHidden)
      } else {
        // Un-blur contentMainContainer only, when aside is hidden
        if (this.getAsideVisible === 'hidden') {
          // mobile state & getAside = hidden: blur the main container
          TweenMax.to(cContentMainEl, 0.45, {
            left: '45px',
            opacity: 1,
            webkitFilter: 'blur(0)'
          })
          // set blurred var to false
          this.setMainContentIsBlurred(false)
        }
      }

      console.groupEnd()
    },
    _showNavMain (cContentMainEl, cContentMainContainerEl) {
      console.group('> SHOW NAV MAIN')

      let ui = this.$options.settings.ui

      // Play the navMain's "hidden" animation (reverse())
      this._showNavMain_tl()

      // Set the navMain params to "visible"
      this.setNavMainVisible('visible')

      // Shrink content area depending on activeBP
      if (this.getActiveBP !== 'mobilePortrait' && this.getActiveBP !== 'mobileLandscape') {
        TweenMax.to(cContentMainEl, 0.45, ui.cContentMain.tweenParamsTo.overrides.navMainVisible)

        // Manipulate radius and drop shadow (=border) of main content area, inner div
        TweenMax.to(cContentMainContainerEl, 0.45, ui.cContentMainContainer.tweenParamsTo.overrides.navMainVisible)
      } else {
        TweenMax.to(cContentMainEl, 0.45, {
          left: '45px',
          autoAlpha: 0.25,
          webkitFilter: 'blur(3px)'
        })

        this.setMainContentIsBlurred(true)

        // also: close the aside, if open
        if (this.getAsideVisible === 'visible') {
          this.toggleAside(null, this.getActiveBP)
        }
      }

      console.groupEnd()
    },

    // ------------------------------------------------------------------------------
    // UI Interaction: Buttons & functions to show/hide navMain
    // ------------------------------------------------------------------------------
    // These functions are saved to a variable in createAnimationsReferences, called in
    // 'appear' and 'afterAppear' respectively
    _showNavMain_tl () {
      let ui = this.$options.settings.ui
      let tl = new TimelineMax({
        // paused: true,
        onComplete: this.cb_showNavMain_tl
      })
      tl.add('start', 0)

      // hidden navMain column
      tl.add(TweenMax.to(ui.cNavMain.el, 0.45, ui.cNavMain.tweenParamsTo.visible), 'start')

      // Tween toggleNavMain button arrow svg / i-tag
      tl.add(TweenMax.to(ui.cBtnToggleNavMain.icon, 0.45, ui.cBtnToggleNavMain.tweenIconParamsTo.visible), 'start')

      return tl
    },
    _hideNavMain_tl () {
      let ui = this.$options.settings.ui
      let tl = new TimelineMax({
        // paused: true,
        onComplete: this.cb_hideNavMain_tl
      })
      tl.add('start', 0)

      // hidden navMain column
      tl.add(TweenMax.to(ui.cNavMain.el, 0.45, ui.cNavMain.tweenParamsTo.hidden), 'start')

      // Tween toggleNavMain button arrow svg / i-tag
      tl.add(TweenMax.to(ui.cBtnToggleNavMain.icon, 0.45, ui.cBtnToggleNavMain.tweenIconParamsTo.hidden), 'start')
      tl.add(TweenMax.to(ui.cBtnToggleNavMain.icon, 0.45, ui.cBtnToggleNavMain.tweenIconParamsTo.hidden), 'start')

      return tl
    }
  }
}
