const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'test',
		database : 'article'
	}
});


const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send('its working') })

app.post('/write', (req, res) =>{
	const { name, title, article } = req.body;
	db('users')
	.returning('*')
	.insert({
		name: name,
		title: title,
		article: article,
		date: new Date()
	})
	.then(user => {
		res.json(user[0]);
	})
	.catch(err => res.status(400).josn(err))
})


app.get('/article', function(req,res) {
	db.select().from('users').then(function(data){
		res.send(data);
	});
});


app.listen(3000, ()=> {
	console.log('app is running');
})