import { TweenMax, TimelineMax } from 'gsap'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // PREPARE STEPS FOR INTRO AND UI
    // ------------------------------------------------------------------------------
    prepareUI (el) {
      // console.group('> PREPARE UI');
      // console.log('el =', el)

      let ui = this.$options.settings.ui

      // container
      ui.cContentMainContainer.el = el.querySelector(ui.cContentMainContainer.elRef)

      ui.cLogo.el = document.querySelector(ui.cLogo.elRef)
      ui.cNavMain.el = document.querySelector(ui.cNavMain.elRef)
      ui.cNavMeta.el = document.querySelector(ui.cNavMeta.elRef)
      ui.cNavMetaMenuItems.el = document.querySelector(ui.cNavMetaMenuItems.elRef) // won't work, becauses ajax-related

      ui.cContentAside.el = document.querySelector(ui.cContentAside.elRef)
      ui.cAudioPlayerContainer.el = document.querySelector(ui.cAudioPlayerContainer.elRef)

      // Btns (with icons)
      ui.cBtnToggleAside.el = document.querySelector(ui.cBtnToggleAside.elRef)
      ui.cBtnToggleAside.icon = document.querySelector(ui.cBtnToggleAside.iconRef)

      ui.cBtnToggleNavMain.el = document.querySelector(ui.cBtnToggleNavMain.elRef)
      ui.cBtnToggleNavMain.icon = document.querySelector(ui.cBtnToggleNavMain.iconRef)

      // These are set during the eforeMount process using the current windowWidth
      // state.nav.main = 'visible'
      // state.aside = 'visible'
      // state.nav.meta = 'visible'
      // TODO: Is this settings used?
      this.setNavMetaVisible('visible')

      // console.groupEnd()
    },
    // ------------------------------------------------------------------------------
    // Main UI visible/hidden Timeline functions
    // ------------------------------------------------------------------------------
    // called in "appear" and "enter"
    tl_showUI (el, timeScale = 1) {
      //console.group('> TL_SHOWUI - App.vue')

      // Short cut to settings object
      let items = this.$options.settings.ui

      let tl = new TimelineMax({
        paused: true,
        onStart: this.cb_startShowingUI,
        onComplete: this.cb_finishedShowingUI
      })
      tl.addLabel('start', 0)
      tl.add(this.tweenEl(items.cLogo, 'visible', 0.1), 'start+=0.1')
      tl.add(this.tweenEl(items.cNavMeta, 'visible'), 'start+=0.2')
      tl.add(this.animateLogo.play(), 'start+=0.3')

      // Aside could be hidden because:
      //    1. user clicked hidden button, 2. we are in mobile state, 3. we are in intro state
      if (this.getAsideVisible === 'hidden') {
        tl.add(this.tweenEl(items.cContentAside, 'hidden'), 'start+=0.4')
        tl.add(this.tweenEl(items.cBtnToggleAside, 'hidden'), 'start+=1.25') // Move to the very end of the animation, when everything is done
        // tl.add(this.tweenEl(items.cBtnToggleAside.icon, 'hidden'), 'start+=1.25') // Move to the very end of the animation, when everything is done
        tl.add(
          TweenMax.to(
            items.cBtnToggleAside.icon,
            this.$options.settings.gsapGlobals.standardAnimationParams.duration,
            items.cBtnToggleAside.tweenIconParamsTo.hidden
          ),
          'start+=1.25'
        )
      } else if (this.getAsideVisible === 'intro') {
        // else if ( this.$options.settings.state.aside === 'intro') {
        tl.add(this.tweenEl(items.cContentAside, 'hidden'), 'start+=0.4')
        tl.add(this.tweenEl(items.cBtnToggleAside, 'intro'), 'start+=1.25')
        // tl.add(this.tweenEl(items.cBtnToggleAside.icon, 'intro'), 'start+=1.25')
        tl.add(
          TweenMax.to(
            items.cBtnToggleAside.icon,
            this.$options.settings.gsapGlobals.standardAnimationParams.duration,
            items.cBtnToggleAside.tweenIconParamsTo.intro
          ),
          'start+=1.25'
        )
      } else {
        tl.add(this.tweenEl(items.cContentAside, 'visible'), 'start+=0.4')
        tl.add(this.tweenEl(items.cBtnToggleAside, 'visible'), 'start+=1.25')
        // tl.add(this.tweenEl(items.cBtnToggleAside.icon, 'visible'), 'start+=1.25')
        tl.add(
          TweenMax.to(
            items.cBtnToggleAside.icon,
            this.$options.settings.gsapGlobals.standardAnimationParams.duration,
            items.cBtnToggleAside.tweenIconParamsTo.visible
          ),
          'start+=1.25'
        )
      }
      tl.add(this.$refs.NewsList.newsFadeIn, 'start+=0.5')
      // Nav Main could be hidden because of
      //    1. user clicked hidden button,
      //    2. we are in mobile state,
      //    3. we are in intro state
      if (this.getNavMainVisible === 'hidden') {
        tl.add(this.tweenEl(items.cNavMain, 'hidden'), 'start+=0.5')
        tl.add(this.tweenEl(items.cBtnToggleNavMain, 'hidden'), 'start+=1.35')
        tl.add(
          TweenMax.to(
            items.cBtnToggleNavMain.icon,
            this.$options.settings.gsapGlobals.standardAnimationParams.duration,
            items.cBtnToggleNavMain.tweenIconParamsTo.hidden
          ),
          'start+=1.35'
        )
      } else {
        tl.add(this.tweenEl(items.cNavMain, 'visible'), 'start+=0.5')
        tl.add(this.tweenEl(items.cBtnToggleNavMain, 'visible'), 'start+=1.35')
        tl.add(
          TweenMax.to(
            items.cBtnToggleNavMain.icon,
            this.$options.settings.gsapGlobals.standardAnimationParams.duration,
            items.cBtnToggleNavMain.tweenIconParamsTo.show
          ),
          'start+=1.35'
        )
      }

      tl.add(this.tweenEl(items.cAudioPlayerContainer, 'visible'), 'start+=0.45')

      // Meta Menues: the tween params on a are not desined yet in the settings. So do it here.
      tl.staggerFromTo(
        document.querySelectorAll('.c-btn-group--nav-meta a'),
        0.45,
        {
          autoAlpha: 0,
          scale: 0.1,
          left: '-47px'
        },
        {
          autoAlpha: 1,
          scale: 1,
          left: 0
        },
        0.05,
        'start+=0.45'
      )

      tl.timeScale()
      tl.play()

      // console.groupEnd()
    },
    // ------------------------------------------------------------------------------
    // Hide UI visible/hidden Timeline functions: called in "LEAVE"
    // ------------------------------------------------------------------------------
    tl_hideUI (el, done, timeScale = 1) {
      //console.group('> HIDE UI');

      // If audio plays or playlist is showing, stop / hidden
      if (this.getAudioPlaying) {
        this.setAudioPlaying(false)
        this.$refs.AudioPlayer.stop()
        // this.$refs.AudioPlayer.stopHowler()
      }
      if (this.getShowPlaylist) {
        this.setShowPlaylist(false)
      }

      // Short cut to settings object
      let items = this.$options.settings.ui,
        dur = 0

      // Build animation timeline
      let tl = new TimelineMax({
        paused: true,
        onComplete: this.cb_finishedHidingUI,
        onCompleteParams: [done]
      })
      tl.add('starthide', 0)

      // Hide news articles
      tl.add(this.$refs.NewsList.newsFadeOut, 'starthide')

      // Hide NavMain container
      tl.add(this.tweenEl(this.$options.settings.ui.cNavMain, 'hidden'), 'starthide+=0.2')

      // Hide main content element
      tl.to(el, 0.5, { autoAlpha: 0 }, 'starthide')

      // Hide Logo
      tl.add(this.animateLogo.reverse().timeScale(timeScale * 1.5), 'starthide')

      // hidden meta menues
      tl.staggerFromTo(
        document.querySelectorAll('.c-btn-group--nav-meta a'),
        0.5,
        { autoAlpha: 1, scale: 1, left: 0 },
        { autoAlpha: 0, scale: 0.1, left: '-47px' },
        '-0.1', // reverse
        'starthide+=0.1'
      )

      tl.add(this.tweenEl(this.$options.settings.ui.cBtnToggleAside, 'intro'), 'starthide+=0.1')
      tl.add(this.tweenEl(this.$options.settings.ui.cBtnToggleNavMain, 'intro'), 'starthide+=0.1')

      // Remove aside (News Article)
      tl.add(this.tweenEl(this.$options.settings.ui.cContentAside, 'hidden'), 'starthide+=0.3')

      // Remove the navMeta container
      tl.add(this.tweenEl(this.$options.settings.ui.cNavMeta, 'hidden'), 'starthide+=0.65')

      tl.add(this.tweenEl(this.$options.settings.ui.cAudioPlayerContainer, 'hidden'), 'starthide+=0.75')

      tl.timeScale(timeScale)
      tl.play()

      // console.groupEnd()
      return tl
    }
  }
}
