import { TweenMax, TimelineMax } from 'gsap'
import CharWrapper from '../../classes/CharWrapper.js'

export default {
  methods: {
    // ------------------------------------------------------------------------------
    // WRAP EACH CHARACTER INTO A DIV
    // ------------------------------------------------------------------------------
    wrapCharsOfIntroText () {
      let intro = new CharWrapper({
        saveToObject: this.$options.settings.collectedTextObjs.allTexts_intro,
        rootSetIdentifier: '.c-intro',
        datasetAttrForSubSetName: 'subSetName',
        datasetAttrForSubSetCharsClass: 'subSetCharsClass',
        // datasetAttrForOrder: 'customOrder',
        enumerateRootSet: false,
        wrapSubSet: {
          includeSpaces: false,
          includeSpecialChars: true
        },
        enumerateSubSet: false,
        wrapSpecialChars: false,
        wrapSpaceChar: true,
        wrapRegularChars: false,
        rootSetClass: 'c-letter',
        saveAsSubSet: true,
        replaceDomSource: true,
        customOrder: true,
        saveAsCustomSet: true,
        customSetName: 'customSet',
        saveAsRootSet: true
      })

      intro.wrapEachLetter()
    },
    // ------------------------------------------------------------------------------
    // TWEEN EACH CHARACTER (LETTER)
    // ------------------------------------------------------------------------------
    _letterTweens () {
      //console.group('> LETTER TWEENS');

      // Access 'Settings' abbreviation
      let item = this.$options.settings.collectedTextObjs.allTexts_intro

      // Create timeline
      let tl = new TimelineMax({
        paused: true,
        onComplete: this.cb_finishedLetterTweens
      })

      tl.staggerFromTo(
        // item.collection,
        '.c-intro .c-letter',
        item.duration,
        item.tweenParamsTo.hidden,
        item.tweenParamsTo.visible,
        item.staggerDelay,
        0, // initial delay
        this.cb_finishedStaggerTweeningIntroText
      )
      return tl.play()

      //console.groupEnd()
    }
  }
}
