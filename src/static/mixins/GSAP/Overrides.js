import { TweenMax, TimelineMax } from 'gsap'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // Overrides from routes
    // ------------------------------------------------------------------------------
    checkOverrides () {
      // Check if there are special overrides from the route
      if (this.$route.meta.overrideLayout !== undefined) {
        if (this.$route.meta.overrideLayout[this.getActiveBP]) {
          let option = this.$route.meta.overrideLayout[this.getActiveBP]
          if (option.showAside === false) {
            this.overrides_hideAside()
          }
          if (option.showAside === true) {
            this.overrides_showAside()
          }
        }
      }
    },
    overrides_hideAside () {
      console.log('> OVERRIDES hideAside')
      this._hideAside(this.$options.settings.ui)

      //this._hideAside_tl() // Does not set aside to hidden

      // TweenMax.to(
      //   this.$options.settings.ui.cContentMain.elRef,
      //   0.45,
      //   this.$options.settings.ui.cContentMain.tweenParamsTo.overrides.asideHidden
      // )

      // TweenMax.to(
      //   this.$options.settings.ui.cContentMainContainer.elRef,
      //   0.45,
      //   this.$options.settings.ui.cContentMainContainer.tweenParamsTo.overrides.asideHidden
      // )
    },
    overrides_showAside () {
      console.log('> OVERRIDES showAside')
      this._showAside(this.$options.settings.ui)

      //this._showAside_tl() // Does not set aside to show

      // TweenMax.to(
      //   this.$options.settings.ui.cContentMain.elRef,
      //   0.45,
      //   this.$options.settings.ui.cContentMain.tweenParamsTo.overrides.asideVisible
      // )

      // TweenMax.to(
      //   this.$options.settings.ui.cContentMainContainer.elRef,
      //   0.45,
      //   this.$options.settings.ui.cContentMainContainer.tweenParamsTo.overrides.asideVisible
      // )
    }
  }
}
