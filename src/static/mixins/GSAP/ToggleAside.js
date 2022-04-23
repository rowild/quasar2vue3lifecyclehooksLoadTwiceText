import { TweenMax, TimelineMax } from 'gsap'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // UI Interaction: Buttons & functions to show/hide aside
    // ------------------------------------------------------------------------------
    // The bp is injected, when the function is called from _hideAside) et alt. below
    toggleAside (evt, bp = null) {
      console.group('> TOGGLE ASIDE')
      let ui = this.$options.settings.ui

      // CASE 1: the user clicked the button.
      // In this case there is no breakpoint calculation desired.
      if (bp === null) {
        if (this.getAsideVisible === 'visible') {
          //console.log('this.getAsideVisible should be visible:' + this.getAside, ', so hidden aside')
          this._hideAside(ui)
        } else {
          //console.log('this.getAsideVisible should be hidden:' + this.getAside, ', so show aside')
          this._showAside(ui)

          // If in mobile state and navMain is open, close navMain
          if (
            this.getNavMainVisible === 'visible' &&
            (this.getActiveBP === 'mobileDesktop' || this.getActiveBP === 'mobilePortrait')
          ) {
            this.toggleNavMain(null, this.getActiveBP)
          }
        }
      }
      // CASE 2: This function was called from somewhere else, e.g. a window.resize listener
      // In this case we need to find out in which brealpoint we are and adjust the layout
      // accordingly.
      // If the responsive breakpoints come into play
      else {
        if (
          bp === 'mobileLandscape' ||
          bp === 'mobilePortrait' ||
          bp === 'tabletLandscape' ||
          bp === 'tabletPortrait'
        ) {
          this._hideAside(ui)
        } else if (bp === 'desktopLandscape' || bp === 'desktopMobile') {
          this._showAside(ui)
        }
      }

      console.groupEnd()
    },
    _hideAside (ui) {
      console.group('> HIDE ASIDE')

      let el = document.querySelector(ui.cContentMain.elRef)

      // Play the aside's "hidden" animation
      this._hideAside_tl()

      // Mark aside as closed ("hidden")
      this.setAsideVisible('hidden')

      // TODO: Add more if clauses for the 6 Breakpoints!
      // TODO: Get the left and right data from the settings object
      // Expand main content area, something only needed in desktop state

      // DESKTOP
      if (this.getActiveBP === 'desktopLandscape' || this.getActiveBP === 'desktopPortrait') {
        TweenMax.to(el, 0.45, ui.cContentMain.tweenParamsTo.overrides.asideHidden)
      }

      // TABLET
      else if (this.getActiveBP === 'tabletLandscape' || this.getActiveBP === 'tabletPortrait') {
        TweenMax.to(el, 0.45, {
          right: '32px',
          opacity: 1,
          webkitFilter: 'blur(0)'
        })
        // Set blurred variable to true
        this.setMainContentIsBlurred(false)
      }

      // MOBILE
      else if (this.getActiveBP === 'mobileDesktop' || this.getActiveBP === 'mobilePortrait') {
        // Un-blur the contentMainContainer only, when navMain is hidden!
        if (this.getNavMainVisible === 'hidden') {
          //console.log('Un-blur main container')
          TweenMax.to(el, 0.45, {
            right: '32px',
            opacity: 1,
            webkitFilter: 'blur(0)'
          })
          // Set blurred variable to true
          this.setMainContentIsBlurred(false)
        } else {
          //console.log('DO NOT Un-blur main container')
          TweenMax.to(el, 0.45, {
            right: '32px'
          })
        }
      }

      console.groupEnd()
    },
    _showAside (ui) {
      console.group('> SHOW ASIDE')

      // Play the sidebar's "hidden" animation (the reverse version of the rtl)
      // this.showAside_tl.restart()
      this._showAside_tl()

      // Mark aside as shown ("visible")
      this.setAsideVisible('visible')

      // TODO: See _hideAside
      // Shrink main content area, but only in desktop view
      //  || 'tabletLandscape' || 'tabletPortrait'
      if (this.getActiveBP === 'desktopLandscape' || this.getActiveBP === 'desktopPortrait') {
        TweenMax.to(document.querySelector(ui.cContentMain.elRef), 0.45, {
          right: ui.cContentMain.tweenParamsTo.bp.desktopLandscape.right
        })
      } else {
        // mobile / tablet state: Blur the main content container
        TweenMax.to(document.querySelector(ui.cContentMain.elRef), 0.45, {
          opacity: 0.25,
          webkitFilter: 'blur(3px)'
        })
        // Set blurred variable to true
        this.setMainContentIsBlurred(true)
      }

      console.groupEnd()
    },
    // These functions are saved to a variable in createAnimationsReferences, called in
    // 'appear' and 'afterAppear' respectivley
    _showAside_tl () {
      let ui = this.$options.settings.ui

      let tl = new TimelineMax({
        // paused: true,
        onComplete: this.cb_showAside_tl
      })
      tl.add('start', 0)

      // hidden aside column
      tl.add(TweenMax.to(ui.cContentAside.el, 0.45, ui.cContentAside.tweenParamsTo.visible), 'start')

      // Show toggleAside button & icon
      tl.add(TweenMax.to(ui.cBtnToggleAside.el, 0.45, ui.cBtnToggleAside.tweenParamsTo.visible), 'start')
      tl.add(TweenMax.to(ui.cBtnToggleAside.icon, 0.45, ui.cBtnToggleAside.tweenIconParamsTo.visible), 'start')

      return tl
    },
    _hideAside_tl () {
      let ui = this.$options.settings.ui

      let tl = new TimelineMax({
        // paused: true,
        onComplete: this.cb_hideAside_tl
      })
      tl.add('start', 0)

      // hidden aside column
      tl.add(TweenMax.to(ui.cContentAside.el, 0.45, ui.cContentAside.tweenParamsTo.hidden), 'start')

      // hidden toggleAside button & icon
      tl.add(TweenMax.to(ui.cBtnToggleAside.el, 0.45, ui.cBtnToggleAside.tweenParamsTo.hidden), 'start')
      tl.add(TweenMax.to(ui.cBtnToggleAside.icon, 0.45, ui.cBtnToggleAside.tweenIconParamsTo.hidden), 'start')

      return tl
    }
  }
}
