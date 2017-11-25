const Wikimedia = {
  search: function (keywords) {
    fetch({
      url: `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${keywords}&origin=*`
    })
    .then(function (result) {
      console.log(result)
      return result
    }, function (reason) {
      console.log(reason)
      return reason
    })
  }
}

function fetch (arg) {
  return new Promise((resolve, reject) => {
    const method = arg.method || 'GET'
    const xhr = new XMLHttpRequest()

    xhr.open(method, arg.url, true)
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)

    xhr.send(JSON.stringify(arg.data))
  })
}

export default Wikimedia
