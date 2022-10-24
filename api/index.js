const app = require('express')()
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const https = require('https');

const blogposts = 
[
	{
		id: '1111',
		title: 'How to prevent re-renderings when using useSelector hook',
		blogPostStatus: 'draft',
	},
	{
		id: '2222',
		title: 'How to prevent re-renderings when using Redux-Toolkit',
		blogPostStatus: 'draft',
	},
	{
		id: '3333',
		title: 'Comparison between Redux and Redux-Toolkit',
		blogPostStatus: 'draft',
	}	
];

app.set('port', (process.env.PORT || 8086));


app.get('/api/blogposts', (req, res) => {
	try {			
		res.send(blogposts);
	}
	catch(err) {
		var errMessage = `${err}`;
		processErrorResponse(res, 500, errMessage);
	}			
})
	
function processErrorResponse(res, statusCode, message) {
	console.log(`${statusCode} ${message}`);
	res.status(statusCode).send({
		error: {
			status: statusCode,
			message: message
		},
	});
}	

app.listen(app.get('port'), function() {
  console.log('Express app redux-toolkit-blogposts is running on port', app.get('port'));
});

module.exports = app