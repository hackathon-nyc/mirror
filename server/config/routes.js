var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

export default (app) => {
  app.get('/api/watson', (req, res) => {
    var personality_insights = new PersonalityInsightsV3({
        "password": "f4f6a3d6-8d3a-4e11-891e-e9c3ce3106a8",
        "username": "WFL5guklUVZq",
        version_date: '2016-10-20'
    });
    /* personality insights credentials and API
    {
    "url": "https://gateway.watsonplatform.net/personality-insights/api",
    }
    */
    personality_insights.profile({
      text: 'I am a software developer & technology hero from NYC. I have been an explorer of the digital space for over a decade. From helping to design and build custom user interfaces, to creating advanced backend applications that aggregate and collect data, my passion is using software to help change the way people interact with the world around them. I am a software developer & technology hero from NYC. I have been an explorer of the digital space for over a decade. From helping to design and build custom user interfaces, to creating advanced backend applications that aggregate and collect data, my passion is using software to help change the way people interact with the world around them. I am a software developer & technology hero from NYC. I have been an explorer of the digital space for over a decade. From helping to design and build custom user interfaces, to creating advanced backend applications that aggregate and collect data, my passion is using software to help change the way people interact with the world around them.',
      consumption_preferences: true
    },
    function (err, response) {
      if(err) {
        res.json(err);
      } else {
        console.log('YPOOO')
        res.send(response);
      }
    });
  });

  app.get('/api/joinChat/:socketID', (req, res) => {
    res.end()
  })
}
