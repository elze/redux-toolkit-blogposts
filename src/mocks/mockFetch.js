const nameNationalizeResponse = {
  name: 'john',
  country:[
    {
      country_id: 'US',
      probability: 0.048398225615958565
    },
    {
      country_id: 'IM',
      probability:0.04438246053773764
    },
    {
      country_id: 'IE',
      probability: 0.042102085396037124
    }
  ]
}

const userStoriesResponse = [
	{
		id: '1111',
		title: 'Implement authentication',
		phase: 'toDo',
		imageUrl: 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_01_ToDo.jpg'
	},
	{
		id: '2222',
		title: 'Write unit tests',
		phase: 'toDo',
		imageUrl: 'https://blog.geekitude.com/wp-content/uploads/2022/09/TicketStage_01_ToDo.jpg'
	}
]


export default async function mockFetch(url) {
	console.log("We are in mockFetch");
  if(url.startsWith('api/userstories')) {
	  console.log("We are about to return fake userstories");
    return {
      ok: true,
      status: 200,
      json: async () => userStoriesResponse,
    };
  }

  throw new Error(`Unhandled request: ${url}`);        
}