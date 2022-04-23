export default {
  settings: {
    collectedTextObjs: {
      // Currently, this is done manually. Any way to automize this? With 'data-' attributes?
      allTexts_intro: {
        allLetters: {},
        subSets: {
          // define the subSets programatically here
          // the 'key' is named using the data-subSet-name propert from HTML
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
    },
    gsapGlobals: {
      toggles: {
        navMain: 'visible',
        aside: 'visible',
        intro: 'active'
      },
      standardAnimationParams: {
        backgroundColor: 'black',
        boxShadow: '0 0 3px 2px rgba(51,51,51,0.2)',
        delay: 0,
        duration: 0.2,
        // ease: Back.easeInOut.config(1.7),
        opacity: 1,
        scale: 1,
        stagger: 0.04
      },
      standardIntroAnimationParams: {
        backgroundColor: 'black',
        boxShadow: '0 0 3px 2px rgba(51,51,51,0.2)',
        delay: 0,
        duration: 0.15,
        // ease: Back.easeInOut.config(1.7),
        opacity: 1,
        scale: 1,
        stagger: 0.04
      }
    },
    helpers: {
      activeSetDuringSetup: 'allTexts_intro',
      totalElems: 0
    },
    ui: {
      // Btns
      // "visible button == enter page (from intro)"
      cBtnUiShow: {
        el: null,
        elRef: '.c-btn__ui-show',
        duration: 0.35,
        tweenParamsTo: {
          visible: {
            autoAlpha: 1
          },
          hidden: {
            autoAlpha: 0
          }
        },
        status: 'hidden'
      },
      cBtnToggleNavMain: {
        el: null,
        elRef: '.c-btn__toggle--nav-main',
        icon: null,
        iconRef: '.c-btn__toggle--nav-main i',
        status: 'hidden',
        tweenParamsTo: {
          // The navMain btn toggle is always positioned on the very left,
          // so this setting might be superfluous
          hidden: {
            left: '8px'
          },
          intro: {
            left: '-27px'
          },
          visible: {
            left: '8px'
          }
        },
        tweenIconParamsTo: {
          hidden: {
            rotation: 180
          },
          intro: {
            rotation: 180
          },
          visible: {
            rotation: 0
          }
        }
      },
      cBtnToggleAside: {
        el: null,
        elRef: '.c-btn__toggle--aside',
        icon: '',
        iconRef: '.c-btn__toggle--aside i',
        status: 'hidden',
        tweenParamsTo: {
          hidden: {
            right: '0'
          },
          intro: {
            // While the intro is visible, all elements are "off-screen". "hidden" does not hide
            // the aside button (it only moves the btn to the very right, but it is still on-screen
            // in 'hidden), therefore we need a special setting group "intro"
            right: '-35px'
          },
          visible: {
            right: '235px'
          }
        },
        tweenIconParamsTo: {
          hidden: {
            rotation: 180
          },
          intro: {
            rotation: 180
          },
          visible: {
            rotation: 0
          }
        }
      },
      // Containers
      cLogo: {
        el: null,
        elRef: '.c-logo',
        tweenParamsTo: {
          hidden: {
            autoAlpha: 0,
            top: '-60px'
          },
          visible: {
            autoAlpha: 1,
            top: '10px'
          }
        },
        status: 'hidden'
      },
      cNavMain: {
        el: null,
        elRef: '.c-nav__main',
        tweenParamsTo: {
          hidden: {
            opacity: 0,
            zIndex: -1,
            left: '-247px'
          },
          visible: {
            opacity: 1,
            zIndex: 2,
            left: '45px'
          }
        },
        status: 'hidden'
      },
      cNavMeta: {
        el: null,
        elRef: '.c-nav__meta',
        status: 'hidden',
        tweenParamsTo: {
          hidden: {
            left: '-47px'
          },
          visible: {
            left: '0'
          }
        }
      },
      cNavMetaMenuItems: {
        el: null,
        elRef: '.c-btn-group--nav-meta', // needs to be an array for staggering!
        status: 'hidden',
        tweenParamsTo: {
          hidden: {
            autoAlpha: 0,
            scale: 0.2
          },
          visible: {
            autoAlpha: 1,
            scale: 1
          }
        }
      },
      cContentMain: {
        el: null,
        elRef: '.o-content__main',
        status: 'hidden',
        tweenParamsTo: {
          overrides: {
            asideHidden: {
              right: '32px'
            },
            asideVisible: {
              right: '270px'
            },
            navMainHidden: {
              left: '45px'
            },
            navMainVisible: {
              left: '305px'
            }
          },
          bp: {
            // Mobile:
            // navMain is considered to be closed
            // Aside is considered to be closed
            // TODO: if in landscape, we could consider
            //       navMain to be open. What do we do
            //       then with the blur state?
            mobileLandscape: {
              left: '45px',
              right: '32px'
            },
            mobilePortrait: {
              left: '45px',
              right: '32px'
            },
            // Tablet:
            // navMain is considered to be opened
            // Aside is considered to be closed
            tabletLandscape: {
              left: '305px',
              right: '32px'
            },
            tabletPortrait: {
              // left: '45px', // What to choose?
              left: '305px',
              right: '32px'
            },
            // Desktop:
            // navMain is considered to be opened
            // Aside is considered to be opened
            desktopLandscape: {
              left: '305px',
              right: '270px'
            },
            desktopPortrait: {
              left: '305px',
              right: '270px'
            }
          },
          hidden: {
            // display: 'none',
            opacity: 0,
            visibility: 'hidden',
            zIndex: 1
          },
          visible: {
            // display: 'block',
            opacity: 1,
            visibility: 'visible',
            zIndex: 1
          }
        }
      },
      cContentMainContainer: {
        el: null,
        elRef: '.o-content__main--container',
        tweenParamsTo: {
          overrides: {
            navMainHidden: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            },
            navMainVisible: {
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            }
          },
          // ? Simplfy to:
          // - (key = dependencies?)
          // - navMainHidden / ...visible
          // - asideHidden / ...visible
          bp: {
            mobileLandscape: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            },
            mobilePortrait: {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            },
            tabletLandscape: {
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            },
            tabletPortrait: {
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            },
            desktopLandscape: {
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            },
            desktopPortrait: {
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px'
            }
          },
          hidden: {
            opacity: 0,
            visibility: 'hidden'
          },
          visible: {
            opacity: 1,
            visibility: 'visible'
          }
        },
        status: 'hidden'
      },
      cContentIntro: {
        el: null,
        elRef: '.o-content__intro',
        status: 'visible',
        tweenParamsTo: {
          hidden: {
            zIndex: -1,
            display: 'none',
            autoAlpha: 0
          },
          visible: {
            zIndex: 5,
            display: 'table',
            autoAlpha: 1
          }
        }
      },
      cContentIntroContainer: {
        el: null,
        elRef: '.o-content__intro--container',
        status: 'visible',
        tweenParamsTo: {
          hidden: {
            // z: '-5000', // this is NOT the zIndex, but the z-perspective as defined in GSAP!!!
            autoAlpha: 0
          },
          visible: {
            // z: '1', // this is NOT the zIndex, but the z-perspective for GSAP!!!
            autoAlpha: 1
          }
        }
      },
      cContentAside: {
        el: null,
        elRef: '.o-content__aside',
        tweenParamsTo: {
          hidden: {
            right: '-226px',
            width: '225px',
            opacity: 1,
            visibility: 1
          },
          visible: {
            right: '10px',
            width: '225px',
            opacity: 1,
            visibility: 1
          }
        },
        status: 'hidden'
      },
      cAudioPlayerContainer: {
        el: null,
        elRef: '.ap-wrapper',
        tweenParamsTo: {
          hidden: {
            bottom: '-47px',
            duration: 2
          },
          visible: {
            bottom: '0',
            duration: 2
          }
        },
        status: 'hidden'
      },
      // This should be recognized automatically by getting the parent container and looping over all children
      // Problem 1: What if there are elements that are not supposed to be in the text manipulation?
      // Problem 2: How can I define separate tween values for each textBlock item? With "data-" attributes?
      // Idea 1: Put all elements that belong to one collection, underneath the collectedTextObjs node. (but these collection only collect the wrapped letters...)
      specials: {
        intro: {
          cWordFn: {
            el: null,
            elRef: '.c-word__fn',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cWordLn: {
            el: null,
            elRef: '.c-word__ln',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cWordProf01: {
            el: null,
            elRef: '.c-word__prof_01',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cWordProf02: {
            el: null,
            elRef: '.c-word__prof_02',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cWordProf03: {
            el: null,
            elRef: '.c-word__prof_03',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cLine: {
            el: null,
            elRef: '.c-line',
            duration: 1.25,
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsFrom: {
              top: '100vh',
              height: 0
              // ease: Power4.easeIn
            },
            tweenParamsTo: {
              top: '56vh',
              height: '56vh'
              // ease: Power2.easeOut
            },
            txt: ''
          }
        },
        logo: {
          cWordNameComplete: {
            el: null,
            elRef: '.c-word__name-complete',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          },
          cWordProfession: {
            el: null,
            elRef: '.c-word__profession',
            letters: '',
            lettersTotal: null,
            parentElem: '',
            status: 'visible',
            tweenParamsTo: {
              hidden: {},
              visible: {}
            },
            txt: ''
          }
        }
      }
    }
  }
}
