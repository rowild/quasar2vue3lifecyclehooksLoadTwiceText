// Not used yet:

import axios from 'axios'

export default {
  method: {
    fetchData (url) {
      //console.groupCollapsed('> fetchData')
      let jsonSrc = 'news.json'

      // this.setError({
      //   bool: false,
      //   msg: 'So far nothing wrong with loading the news...',
      //   section: 'news'
      // })

      // When going back to the intro, the jsonSrc might be empty; so catch that.
      if (jsonSrc !== '/') {
        // this.setLoading({
        //   bool: true,
        //   section: 'news'
        // })

        axios
          .get(jsonSrc)
          .then(response => {
            // //console.log("     got news:", response.data.news)
            this.newsList = response.data.news
          })
          .catch(err => {
            // //console.warn("     failed to get news:", err)
            // this.setError({
            //   bool: true,
            //   msg: "An error loading the data for " + jsonSrc + " has occured:" + err,
            //   section: 'news'
            // })
          })
          .finally(() => {
            // //console.log("     Finally news getting is over, this.$refs=", this.$refs)
            // this.setLoading({
            //   bool: false,
            //   msg: 'Finished loading news',
            //   section: 'news'
            // })
            // Recalculate size of scroller once the news area is populated
            this.$refs.NewsScrollbar.calculateSize()
          })
      } else {
        // nothing needs to happen, right?
        // this.setLoading({
        //   bool: false,
        //   section: 'news'
        // })
        // this.setError({
        //   bool: false,
        //   msg: "Moving to intro, for which there is no json data available.",
        //   section: 'news'
        // })
      }

      //console.groupEnd()
    }
  }
}
