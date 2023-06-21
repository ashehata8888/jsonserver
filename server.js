const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);


server.get('/',(req,res)=>{
  res.json("Hello this the json server page")
})

// Custom route for saving form data
server.post('/api/saveFormData', (req, res) => {
  const formData = req.body;
  const db = router.db;

  db.get('formData')
    .push(formData)
    .write();

  res.json(formData);
});

// Custom route for retrieving form data
server.get('/api/getFormData', (req, res) => {
  const db = router.db;
  const formData = db.get('formData').value();

  if (formData.length > 0) {
    res.json(formData[0]);
  } else {
    res.json({});
  }
});



server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});