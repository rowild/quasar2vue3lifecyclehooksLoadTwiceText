/**
 * CharWrapper
 *
 * See letter wrapper. This solution is not with regex, but with the
 * browsers' DOM parser working on nodes types:
 * if(el.nodeType === 3) { console.log("A Text Node, which is, what this class needs.")}
 * Node Types: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 * Reason: regex is said to be slow and not the right tool, when it comes
 * to DOM manipulation. (Even though LetterWrapper is actually a text
 * manipulation on a var in RAM...)
 *
 * Regex example on CodePen
 * https://codepen.io/rowild/pen/rZqJjB (forked)
 */

const rootSetObjectStructure = {
  allLetters: {},
  subSets: {
    // define the subSets programatically here
    // the 'key' is named using the data-subSet-name property from HTML
  },
  collection: [],
  delay: 0,
  duration: 0.5,
  staggerDelay: 0.03,
  tweenParamsTo: {
    hidden: {
      opacity: 0,
      scale: 0.05
    },
    visible: {
      opacity: 1,
      scale: 1
    }
  }
}

import _orderBy from 'lodash/orderBy'
// import _flatter from 'lodash/flatten'

/**
 * Class CharWrapper
 *
 * Provide a DOM element that acts as a root object over the contained text
 * that shall be wrapped:
 *
 * E.g.:
 * let rootText = new CharWrapper({
 *   rootSetIdentifier: '.root',
 *   [...]
 * })
 * rootText.wrapEachLetter()
 *
 * CAVEATS:
 *
 * Order of texts:
 *   Be aware that the oder of the text is defined by
 *   the position of the elements in the DOM. This is important, because the
 *   numbering system (adding enumerate classes) uses this fact as its "source
 *   of truth".
 *
 * Forbidden letters:
 *   Since we are dealing with html, try not to use > and < at the moment.
 *   A plan to converts such characters to unicode is in plan.
 *
 * Non-English characters
 *   At the moment, no umlaute or any diacritical character (like French or
 *   Spanish letters with accents) are supported.
 */
class CharWrapper {
  constructor (options) {
    // console.log('CharWrapper this =', this);
    // console.log('CharWrapper options =', options)
    /**
     * To save the results to an JS object, use a structure like this:
     *
     * Rules:
     * - Choose a name for the "root" key of the object (can be nested within another object)
     * - the key "allLetters" and "subSets" must be created on that "root" key
     *
     * Example:
     * myRootKey: {
     *   allLetters: { },
     *   subSets: {
     *     // the 'key' is named using the data-subSet-name propert from HTML
     *   }
     * }
     */
    this.saveToObject = options.saveToObject
    Object.assign(this.saveToObject, rootSetObjectStructure)
    /**
     * Since the "root"-entitled options are singular, calculate/define them right away
     */
    this._rootSet = document.querySelector(options.rootSetIdentifier)
    /**
     * Data sets
     * see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
     * - lowercase in HTML
     * - camelCase for use in JS
     * - must be on same dom element as rootSetIdentifier
     *
     * If the rootset contains elements that shall not be indexed use "_exlude_"
     * on the datasetSubSetName
     */
    this.datasetAttrForSubSetName = options.datasetAttrForSubSetName
    this.datasetAttrForSubSetCharsClass = options.datasetAttrForSubSetCharsClass
    this.datasetAttrForCustomOrder = options.datasetAttrForCustomOrder
    /**
     * Turn things on/off
     *
     * Switchs with nested boolean
     * true requires an object like this:
     * enumerateRootSet: {
     *   includeSpaces: true,
     *   includeSpecialChars: true
     * },
     * To diable this process, just use "false"
     */
    this.wrapRootSet = options.wrapRootSet
    this.enumerateRootSet = options.enumerateRootSet
    this.wrapSubSet = options.wrapSubSet
    this.enumerateSubSet = options.enumerateSubSet
    // wrap special characters like ?, |, :, >, <,...; see also specialsChars comment!
    this.wrapSpecialChars = options.wrapSpecialChars
    this.wrapSpaceChar = options.wrapSpaceChar
    // "normal" chars (no special characters, no empty spaces...) -> needed?
    // yes, so we can exclude empty spaces in the animation by just reading the
    // regularCharacterWrapClasses
    this.wrapRegularChars = options.wrapRegularChars
    // Special modification added to classes
    // re-use base-class and add a number (e.g. '.letter-01')
    //
    // The wrap tag and its classes
    //
    // The tag a letter is wrapped into; make sure is is set to "display: inline.block"
    // TODO: implement the usage of this variable
    this.tag = options.tag || 'div' // TODO: not in use yet
    // CSS classes
    this.rootSetClass = options.rootSetClass || 'belongs-to-root-set'
    this.specialCharsClass = options.specialCharsClass || 'is-special-char'
    this.spaceCharClass = options.spaceCharClass || 'is-space-char'
    this.regularCharsClass = options.regularCharsClass || 'is-regular-char'
    /**
     * Replace & save
     */
    this.replaceDomSource = options.replaceDomSource
    this.saveAsSubSet = options.saveAsSubSet
    this.customOrder = options.customOrder
    this.saveAsCustomSet = options.saveAsCustomSet
    this.customSetName = options.customSetName
    this.saveAsRootSet = options.saveAsRootSet
    /* eslint-disable no-useless-escape */
    // TODO: Check special chars like Umlaute or French accents, cedil etc, Spanish...
    // include specialChars, but not spaceChar
    this.includeSpecialCharsPattern = options.includeSpecialCharsPattern || /[\w+-\<>?!:;,$,%|]/
    // include spaceChar, but not specialChars
    this.includeSpacesPattern = options.includeSpacesPattern || /[\w+-\s]/
    // Only regular chars ('.is-regular')
    this.regularCharsPattern = options.regularCharsPattern || /[\w+-]/
    // Only specialChars ('.is-special-char')
    this.specialCharsPattern = options.specialCharsPattern || /[<>?!:;,$,%|]/
    // Hint: If specialChars, spaceChar and regularChar are required, no regex math is
    // necessary; instead, just add the class
    /* eslint-enable no-useless-escape */
    // Global counter to add incemental numbering (on a class) over ALL subSets
    this.rootSetCounter = 0
    // Global counter for subsets, needs to be reset in _wrapSubSetChar
    this.subSetCounter = 0
  }

  // printMessage (msg) {
  //   console.log(msg)
  // }

  // The node param is needed for the recursive steps
  wrapEachLetter (node = '') {
    let sets = null
    let processedCharacters = []

    if (!this.customOrder) {
      if (!node) {
        // The first call is NOT done on the childNodes, but uses the
        // _rootSet param, that was created using the rootSetIdentifier
        // class provided in the class construction
        sets = this._rootSet.childNodes
      } else {
        sets = node.childNodes
      }

      const len = sets.length
      for (let i = 0; i < len; i++) {
        if (sets[i].nodeType === 3) {
          const result = this._processSet(sets[i])
          processedCharacters.push(result)

          // TODO: Not working
          // the replacement function uses parentNode to clear innerText.
          // That deletes the whole node, which means, there is no node
          // anymore upon which appenChild can be performed.
          // Currently no solution.
          // Workaround: use customOrder = true (with the respective dataset in the HTML)
          if (this.replaceDomSource) {
            this._replaceDom(sets[i].parentNode, result)
          }
        } else {
          // Node is not of Type 3 ('innerText'). Parse its child nodes recursively
          this.wrapEachLetter(sets[i])
        }
      }
    }
    else {
      // Ordered Sets: Found by dataset, NodeType = 1, not 3!
      const foundSets = this._rootSet.querySelectorAll('[data-custom-order]')

      // Use lodash to order using an attribute of the found array
      // @source https://stackoverflow.com/questions/41077260/lodash-orderby-with-child-attributes
      const orderedSets = _orderBy(
        foundSets,
        data => {
          // Attribute by which to order
          return [data.dataset.customOrder]
        },
        ['asc']
      )

      const len = orderedSets.length
      for (let j = 0; j < len; j++) {
        if (orderedSets[j].childNodes[0].nodeType === 3) {
          const result = this._processSet(orderedSets[j].childNodes[0])
          processedCharacters.push(result)

          if (this.replaceDomSource) {
            this._replaceDom(orderedSets[j], result)
          }
        }
      }
    }

    processedCharacters = processedCharacters.reduce((a, b) => a.concat(b))

    if (this.saveAsRootSet) {
      this.saveToObject.allLetters = processedCharacters
    }

    if (this.saveAsCustomSet) {
      this.saveToObject[this.customSetName] = processedCharacters
    }
  }

  _replaceDom (domEl, result) {
    // console.log(' ')
    // console.log('replaceDom')
    // console.log('domEL =', domEl)
    // console.log('result =', result)
    domEl.innerText = ''
    for (const i in result) {
      domEl.appendChild(result[i])
    }
  }

  _processSet (set) {
    const subSetCharsClass = set.parentNode.dataset[this.datasetAttrForSubSetCharsClass]
    const subSetName = set.parentNode.dataset[this.datasetAttrForSubSetName]
    let subSet = null

    // If the rootset contains elements that shall not be indexed use "_exlude_" as dataset name
    if (subSetName !== '_exclude_') {
      subSet = this._wrapSubSetChars(set, subSetCharsClass)
    }

    if (this.saveAsSubSet) {
      if (subSetName !== '_exclude_') {
        // console.log('subSetName =', subSetName);
        // console.log('this.saveToObject =', this.saveToObject);
        this.saveToObject.subSets[subSetName] = subSet
      }
    }

    return subSet
  }

  saveAsRootSet () {
    let allLetters = ''
    let counter = 0
    const len = Object.keys(this.saveToObject.subSets).length

    for (const item in this.saveToObject.subSets) {
      counter++
      // allLetters.concat(Array.from(this.saveToObject.subSets[item]))
      allLetters += this.saveToObject.subSets[item]

      // Add a comma as long as lng as there are more strings to be attached
      if (counter !== len) {
        allLetters += ','
      }
    }

    this.saveToObject.allLetters = allLetters.split(',')
  }

  // Wrapping chars of one subSet only
  // Pay attention to the order of functions, if a readable structure in classes is desired.
  _wrapSubSetChars (node, subSetCharsClass) {
    // Prepare individual character class name:
    // - Use indivudual class for the wrap of the text node characters
    // - Get from parentNode: dataset-subclass, dataset-subSetname (for saveToSubSet)
    // - Split innerText
    // - Reset subSetCounter here (used for the enumerated variant of the subSetCharsClass)
    const charsArr = node.textContent.split('')
    this.subSetCounter = 0

    return charsArr.map(char => {
      // Base wrap class that all chars receive
      let cls = this.rootSetClass

      if (this.enumerateRootSet) {
        // console.log('enumerateRootSet called, this.enumerateRootSet =', this.enumerateRootSet)
        cls += this._getClass(char, this.enumerateRootSet, this.rootSetClass, 'rootSetCounter')
      }

      if (this.wrapSubSet) {
        cls += this._getClass(char, this.wrapSubSet, subSetCharsClass, false)
      }

      if (this.enumerateSubSet) {
        cls += this._getClass(char, this.enumerateSubSet, subSetCharsClass, 'subSetCounter')
      }

      if (this.wrapSpaceChar) {
        if (char.match(/\s/)) {
          cls += ' ' + this.spaceCharClass
        }
      }

      if (this.wrapSpecialChars) {
        // if (['|', '?', ';', '!', ',', '<', '>', '$', '§'].includes(letter)) {
        if (char.match(this.specialCharsPattern)) {
          cls += ' ' + this.specialCharsClass
        }
      }

      if (this.wrapRegularChars) {
        if (char.match(this.regularCharsPattern)) {
          cls += ' ' + this.regularCharsClass
        }
      }

      const newElem = document.createElement('div')
      const newTxtNode = document.createTextNode(char)
      newElem.appendChild(newTxtNode)
      newElem.setAttribute('class', cls)

      return newElem
      // This does NOT return a Node, but only a String. Not useable!
      // return `<div class="${cls}">${char}</div>`
    })
  }

  /** ----------------------------------------------------------------------
   * Wrapper functions (private? only because of underline...)
   * --------------------------------------------------------------------- */

  _getClass (letter, rules, className, counter) {
    let cls = ''

    if (counter === 'rootSetCounter') {
      className += '-' + this._addZerosToInteger(this.rootSetCounter++)
    }
    else if (counter === 'subSetCounter') {
      className += '-' + this._addZerosToInteger(this.subSetCounter++)
    }

    if (rules.includeSpaces && rules.includeSpecialChars) {
      cls = ' ' + className
    }
    else if (rules.includeSpaces && !rules.includeSpecialChars) {
      if (letter.match(this.includeSpacesPattern)) {
        cls = ' ' + className
      }
    }
    else if (!rules.includeSpaces && rules.includeSpecialChars) {
      if (letter.match(this.includeSpecialCharsPattern)) {
        cls = ' ' + className
      }
    }

    return cls
  }

  /** ----------------------------------------------------------------------
   * Helper functions (private? only because of underline...)
   * --------------------------------------------------------------------- */

  _addZerosToInteger (int) {
    // format counter up to 3 digits, using double tertiary
    return int < 100 && int > 9 ? '0' + int : int < 10 ? '00' + int : '0' + int
  }
}

export default CharWrapper
/* eslint-enable no-unused-vars */
