// Provide more stylings for console to be used for each %c params
// @src https://www.freecodecamp.org/news/how-to-go-beyond-console-log-and-get-the-most-out-of-your-browsers-debugging-console-e185256a1115/
//
// It is recommended to add this file as a mixin for global access on "this.$options.consoleStyles.[...]
// It is discouraged, though, to implement the life cycle hooks as a mixin, because they do not
// allow to add text/functionalityin between their console.group() and console.groupEnd() calls.
// So better add them via a VSCode snippet, like here: "vlife" and for transitions "vtrans"
//
export default {
  name: 'consoleStyles',
  consoleStyles: {
    lifeCycleHookIndicator: ['background-color:rgba(255,255,255,0.1)', 'color: rgb(0,128,128)', 'padding:2px 5px'].join(';'),
    transitionsIndicator: ['background-color:rgba(255,255,255,0.1)', 'color: rgb(255,215,0)', 'padding:2px 5px'].join(';'),
    normalText: ['background-color: rgba(255, 255, 255, 0.1)', 'color: #ffffff', 'padding: 2px 5px'].join(';'),
    sourceFileText: ['background-color:rgba(255,255,255,0.1)', 'color:teal', 'padding:2px 5px'].join(';'),
    muteText: ['background-color:rgba(255,255,255,0.1)', 'color:#666666', 'padding:2px 5px'].join(';')
  }
}
