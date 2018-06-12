// ~~~~~~~~~~~~~~~~~~~~~
// wikimedia service API
// ~~~~~~~~~~~~~~~~~~~~~

export default {
  search (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&titles=${keywords}&prop=pageimages|images|pageterms|extracts&exintro=true&piprop=thumbnail|original&pithumbsize=1000&pilimit=10&wbptterms=description&redirects&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log(reason))
  },

  approximativeMatches (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&generator=prefixsearch&gpssearch=${keywords}&gpslimit=10&prop=pageimages|imageinfo|pageterms|extracts&exintro=true&piprop=thumbnail&pithumbsize=500&pilimit=10&wbptterms=description&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log(reason))
  },

  queryImages (keywords) {
    return fetch(`https://en.wikipedia.org/w/api.php?action=query&formatversion=2&format=json&titles=${keywords}&prop=imageinfo&iiprop=url&origin=*`)
      .then((results) => { return results.json() })
      .catch((reason) => console.log(reason))
  }
}
