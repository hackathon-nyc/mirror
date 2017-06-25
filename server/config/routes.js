
export default (app) => {
  app.get('/api/setID/:id', (req, res) => {
    console.log(req.params.id);
  });

  app.post('/api/postClarifyResults', (req, res) => {
    console.log('req.body: ', req.body)
    JSON.parse(req.body)
    res.end()
  })
}
