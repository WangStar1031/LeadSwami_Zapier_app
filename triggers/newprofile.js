const listRecipes = (z, bundle) => {
  // z.console.log('hello from a console log!');
  // const promise = z.request('http://mytest.com:8000/api/newProfiles');
  // const promise = z.request('http://esl-ninja.com/card_game/newProfile.php');
  z.console.log(bundle.authData.access_token);
  const promise = z.request('http://217.69.3.14:81/api/newProfiles?Authorization=' + bundle.authData.access_token);
  return promise.then((response) => {
    z.console.log(response);
    return response.json;
  });
};

module.exports = {
  key: 'newProfile',
  noun: 'NewProfile',
  display: {
    label: 'New Profile',
    description: 'Trigger when a new profile is added.'
  },
  operation: {
    perform: listRecipes,
    sample: {
      id: 1,
      email: 'wangstar1031@hotmail.com',
      name: 'Wang Xing',
      headline: 'fullstack developer',
      location: 'China',
      url: 'https://linkedin.com/in/wang-xing-3864b2144/',
      imgurl: 'https://media.licdn.com/dms/image/C4D03AQHBwdehmdxpJQ/profile-displayphoto-shrink_200_200/0',
      phonenumber: '',
      lastjob: 'fullstack developer',
      twitter: '',
      site: '',
      tag: ''
    },
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'email', label: 'Email'},
      {key: 'name', label: 'Name'},
      {key: 'headline', label: 'Headline'},
      {key: 'location', label: 'Location'},
      {key: 'url', label: 'Url'},
      {key: 'imgurl', label: 'ImgUrl'},
      {key: 'phonenumber', label: 'PhoneNumber'},
      {key: 'lastjob', label: 'LastJob'},
      {key: 'twitter', label: 'Twitter'},
      {key: 'site', label: 'Site'},
      {key: 'tag', label: 'Tag'}
    ]
  }
};