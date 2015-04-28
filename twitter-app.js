if (Meteor.isClient) {

  Meteor.call('getHeader', function (error, result) {
    if (error) {
      console.log("error", error);
    };

    Session.set("header", result);
  });

  Template.tweets.helpers({
    header: function () {
      return Session.get("header");
    } 
  });

Meteor.call('getBody', function (error, result) {
    if (error) {
      console.log("error", error);
    };

    Session.set("body", result);
  });

  Template.tweets.helpers({
    body: function () {
      return Session.get("body");
    } 
  });


}

  if (Meteor.isServer) {
      Meteor.startup(function () {
        var cheerio = Meteor.npmRequire('cheerio');

    Meteor.methods({
      
      getHeader: function () {
        result = Meteor.http.get("https://twitter.com/makeskrilla");
        $ = cheerio.load(result.content);
        var header = $('#stream-item-tweet-577297049164619776 > div > div.ProfileTweet-header.u-cf').text();
        return header;
      },

      getBody: function () {
        result = Meteor.http.get("https://twitter.com/makeskrilla");
        $ = cheerio.load(result.content);
        var body = $('#stream-item-tweet-577297049164619776 > div > div.ProfileTweet-contents > p').text();
        return body;
      },

    })

  });
}
