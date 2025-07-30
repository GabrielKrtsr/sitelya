module.exports.sendHTMLfile =
   (_,res) =>  {
      const options = { 
                        root: 'public/html',
                        headers: {
                           'Content-Type': 'text/html',
                           'x-timestamp': Date.now(),
                           'x-sent': true
                        }
                      };
      res.sendFile('index.html', options);
}