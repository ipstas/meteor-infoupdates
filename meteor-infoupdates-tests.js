// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by meteor-infoupdates.js.
import { name as packageName } from "meteor/meteor-infoupdates";

// Write your tests here!
// Here is an example.
Tinytest.add('meteor-infoupdates - example', function (test) {
  test.equal(packageName, "meteor-infoupdates");
});
