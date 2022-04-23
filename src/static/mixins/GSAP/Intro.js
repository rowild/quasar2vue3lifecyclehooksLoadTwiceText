import { TimelineMax } from 'gsap'

export default {
  methods: {
    // prepareIntro called from "appear" or "enter" lifecycle hook (whichever is pageFirstLoad)
    // "el" = the lifecycle hook's element
    prepareIntro (el, topic = 'intro') {
      // console.group('> PREPARE INTRO')
      // console.log('el =', el)

      let conf = this.$options.settings,
        set = this.$options.settings.ui.specials[topic]

      // TODO: With the given JSON structure, an automatisation of assigning real DOM
      // to the prepared keys is yet not possible. Is there a solution? Depend very
      // heavily on the JSON. Below is a first step, but does not work wit 'logo' yet.
      if (topic === 'intro') {
        conf.ui.cContentIntroContainer.el = el.querySelector(conf.ui.cContentIntroContainer.elRef)
        conf.ui.cContentIntro.el = el
        conf.ui.cBtnUiShow.el = el.querySelector(conf.ui.cBtnUiShow.elRef)
      }

      // Old version
      // set.cWordFn.el = el.querySelector(set.cWordFn.elRef)
      // set.cWordLn.el = el.querySelector(set.cWordLn.elRef)
      // set.cWordProf01.el = el.querySelector(set.cWordProf01.elRef)
      // set.cWordProf02.el = el.querySelector(set.cWordProf02.elRef)
      // set.cWordProf03.el = el.querySelector(set.cWordProf03.elRef)
      // set.cLine.el = el.querySelector(set.cLine.elRef)

      // New Version: Needs carefully prepared JSON
      for (let i in set) {
        const item = set[i]
        //console.log('item =', item);
        item.el = el.querySelector(item.elRef)

        //console.log('item.el =', item.el);
      }

      if (this.getIntroTextsBuilt === false) {
        this.wrapCharsOfIntroText()
        // Set introTextBuilt to true
        this.setIntroTextsBuilt(true)
      }

      // console.groupEnd()
    },
    tl_showIntro (timeScale = 1) {
      //console.group('> TL_SHOWINTRO')
      //console.log('this.$route.path =', this.$route.path)

      // access SETTINGS abbreviation
      let item = this.$options.settings.ui
      let itemIntro = this.$options.settings.ui.specials.intro

      // Build Intro Animation. (Probably create the as a separate function that is already called in beforeAppear??)
      let _showIntro = new TimelineMax({
        paused: true,
        onStart: this.cb_startShowingIntro,
        onComplete: this.cb_finishedShowingIntro
      })
      _showIntro.add('start')
      _showIntro.set(item.cContentIntro.el, item.cContentIntro.tweenParamsTo.visible)
      _showIntro.set(item.cContentIntroContainer.el, item.cContentIntroContainer.tweenParamsTo.visible)
      _showIntro.add(this._letterTweens(), 'start')
      _showIntro.fromTo(itemIntro.cLine.el, itemIntro.cLine.duration, itemIntro.cLine.tweenParamsFrom, itemIntro.cLine.tweenParamsTo, 'start+=.5')
      _showIntro.fromTo(item.cBtnUiShow.el, item.cBtnUiShow.duration, item.cBtnUiShow.tweenParamsTo.hidden, item.cBtnUiShow.tweenParamsTo.visible, '-=.5')
      _showIntro.timeScale(timeScale)
      _showIntro.play()

      // console.groupEnd()
    },
    // ------------------------------------------------------------------------------
    // HIDE INTRO
    // ------------------------------------------------------------------------------
    tl_hideIntro (done, timeScale = 1) {
      // console.group('> tl_hideIntro called')

      // access SETTINGS abbreviation
      let item = this.$options.settings.ui
      let itemIntro = this.$options.settings.ui.specials.intro

      // console.log('this =', this)
      // console.log('itemIntro =', itemIntro)

      // Build Intro Animation.
      // TODO: create this anim outside, save it to a var and call the var
      this.tlhideIntro = new TimelineMax({
        paused: true,
        onComplete: this.cb_finishedHidingIntro,
        onCompleteParams: [done]
      })
      this.tlhideIntro.add('start')
      this.tlhideIntro.fromTo(
        item.cBtnUiShow.el,
        item.cBtnUiShow.duration,
        item.cBtnUiShow.tweenParamsTo.visible,
        item.cBtnUiShow.tweenParamsTo.hidden,
        'start'
      )
      this.tlhideIntro.fromTo(itemIntro.cLine.el, itemIntro.cLine.duration, itemIntro.cLine.tweenParamsTo, itemIntro.cLine.tweenParamsFrom, 'start+=.5')
      this.tlhideIntro.add(this._letterTweens().reverse(0), 'start')
      // this.tlhideIntro.add(item.cContentIntroContainer.el, 0, item.cContentIntroContainer.tweenParamsTo.visible);

      this.tlhideIntro.timeScale(timeScale)
      this.tlhideIntro.play()

      // console.groupEnd()
    }
  }
}
