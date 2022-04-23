export default {
  methods: {
    // ------------------------------------------------------------------------------
    // GSAP: Lifecycle Callbacks
    // ------------------------------------------------------------------------------
    cb_finishedAppear (done) {
      done()
      this.checkOverrides()
    },
    // ------------------------------------------------------------------------------
    // GSAP: Intro Callbacks
    // ------------------------------------------------------------------------------
    cb_startShowingIntro () {
      this.setTransition('active')
    },
    cb_finishedShowingIntro () {
      this.setTransition('idle')
      this.setIntroActive(true)
      this.setUiActive(false)
      //console.log('%c   < Finished showing intro, set introActive to true')
      //console.log('    introActive:' + this.getIntroActive + ', uiActive:' + this.getUiActive + ', transioning', 'color: grey')
    },
    cb_finishedHidingIntro (done) {
      // set introActive to false
      this.setIntroActive(false)
      this.setUiActive(true)
      // this.setShowing('ui') // NOT HERE!!! happens in
      if (done !== null) {
        done()
      }
      // console.log(
      //   '%c   < Finished hiding the intro, set introActive = false (and call done() if not null)',
      //   'color: grey'
      // )
      // console.log('    introActive:' + this.getIntroActive + ', uiActive:' + this.getUiActive, 'color: grey')
    },
    // ------------------------------------------------------------------------------
    // GSAP: UI Callbacks
    // ------------------------------------------------------------------------------
    cb_startShowingUI () {
      this.setTransition('active')
    },
    cb_finishedShowingUI () {
      this.setIntroActive(false)
      this.setUiActive(true)
      // this.setShowing('intro') // NOT HERE!!! happens in enter!
      //console.log('%c   < Finished showing the UI, set uiActive = true')
      //console.log('    introActive:' + this.getIntroActive + ', uiActive:' + this.getUiActive, 'color: grey')
    },
    cb_finishedHidingUI (done) {
      // set introActive to true
      this.setIntroActive(true)
      this.setUiActive(false)

      if (done !== null) {
        done()
      }
      // console.log('%c   < Finished hiding the UI, set uiActive = false (and call done() if not null)', 'color: grey')
      // console.log('    introActive: ' + this.getIntroActive + ', uiActive:' + this.getUiActive, ', done:', done)
    },
    // ------------------------------------------------------------------------------
    // GSAP: Character Tweens Callbacks
    // ------------------------------------------------------------------------------
    cb_finishedStaggerTweeningIntroText () {
      //console.log('%c   < Finished stagger-tweening intro text.', 'color: grey');
    },
    cb_finishedLetterTweens () {
      //console.log('%c   < Finished tweening of staggered elements.', 'color: grey');
    },
    // ------------------------------------------------------------------------------
    // GSAP: ToggleAside and ToggleNavMain callbacks
    // ------------------------------------------------------------------------------
    cb_showAside_tl () {
      // console.log('%c   < showAside_tl animation finished.', 'color: grey')
    },
    cb_hideAside_tl () {
      // console.log('%c   < hideAside_tl animation finished.', 'color: grey')
    },
    cb_showNavMain_tl () {
      // console.log('%c   < _showNavMain_tl animation finished.', 'color: grey')
    },
    cb_hideNavMain_tl () {
      // console.log('%c   < _hideNavMain_tl animation finished.', 'color: grey')
    },
    // ------------------------------------------------------------------------------
    // GSAP: Logo Callbacks
    // ------------------------------------------------------------------------------
    cb_finishedLogoAnimation () {
      console.log('CB> Finished Logo animation')
    },
    cb_finishedLogoReversedAnimation () {
      console.log('CB> Finished Logo reversed animation')
    },
    // ------------------------------------------------------------------------------
    // GSAP: News List Callbacks
    // ------------------------------------------------------------------------------
    cb_finishedNewsStaggerFadeIn () {
      console.log('CB> Finished newsFadeIn in news list items')
    },
    cb_finishedNewsStaggerFadeOut () {
      console.log('CB> Finished newsFadeOut in news list items')
    }
  }
}
