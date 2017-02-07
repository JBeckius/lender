var Connect = (function() {

  function ajaxRequest(url, body, type) {
    url = Config.environment.path + url;
    type = type || "GET";
    console.log("Getting");
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(type, url, true);
      req.setRequestHeader('Content-Type', 'application/json');
      // if(appVars.authToken) {
      //   req.setRequestHeader('x-access-token', appVars.authToken);
      // }
      req.onreadystatechange = function() {
        if(this.readyState == this.HEADERS_RECEIVED) {
          //appVars.authToken = req.getResponseHeader('authToken');
        }
      }
      req.addEventListener("load", function() {
        if(req.status < 400) {
          console.log(req);
          var res = JSON.parse(req.responseText);

          resolve(res);
        } else {
          console.log(req.responseText);
          reject(req);
        }
      });
      req.send(JSON.stringify(body));
    });
  };

  function submitBook(bookObj) {
    ajaxRequest('/books', bookObj, 'POST')
    .catch(console.error.bind(console));

  }

  return {
    ajaxRequest: ajaxRequest,
    submitBook: submitBook
  }
})();
