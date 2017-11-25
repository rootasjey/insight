var httpHelpers = {
  fetch: function (arg) {
    return new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open(arg.method, arg.url, true);
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      // req.onreadystatechange = function () {
      //   if (req.readyState === 4) {
      //     if (req.status === 200) {
      //       arg.success(req.response, req);
      //       return;
      //     }
      //
      //     console.error('The request failed');
      //     arg.failure(req.response, req);
      //   }
      // }.bind(this);
      req.onload = () => resolve(req.responseText);
      req.onerror = () => reject(req.statusText)

      req.send(JSON.stringify(arg.data));
    });
  }
}
