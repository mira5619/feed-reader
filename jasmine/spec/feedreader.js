/*  File:   feedreader.js
 *
 * Author:  Margarita Ivanova ivanova5619@abv.bg
 * Date:    september 2016
 * Course:  Javascript Testing
 * Project: Feed Reader Testing
 * Summary of file:
 *  This is the spec file that Jasmine will read and contains
 *  all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test that loops through each feed in the allFeeds object
        it('each feed has URL, defined and not empty', function() {
            for(var i = 0; i<allFeeds.length; i++) {

                //and ensures it has a URL defined
                expect(allFeeds[i].url).toBeDefined();

                //and that the URL is not empty
                expect(allFeeds[i].url.length).not.toBe(0);

                //and it is string
                expect(typeof allFeeds[i].url).toBe('string');

                //and this is actually url
                expect(allFeeds[i].url.slice(0,5)).toBe('http:');

            }
        });

         //a test that loops through each feed in the allFeeds object
         it('each feed has name, defined and not empty', function() {
            for(var i = 0; i<allFeeds.length; i++) {

                //and ensures it has a name defined
                expect(allFeeds[i].name).toBeDefined();

                //and that the name is not empty
                expect(allFeeds[i].name.length).toBeGreaterThan(0);

                //and it is string
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });
    });

    /* a test suite named "The menu" */
    describe('The menu', function() {

        //test that ensures the menu element is hidden by default
        it('is hidden by default', function() {
            expect(document.body.className).toBe('menu-hidden');
        });

        //test that ensures the menu changes visibility when the menu icon is clicked
        it('menu changes visibility when clicked', function() {

            //does the menu display when clicked
            $('.menu-icon-link').click();
            expect(document.body.className).not.toBe('menu-hidden');

            //and does it hide when clicked again
            $('.menu-icon-link').click();
            expect(document.body.className).toBe('menu-hidden');
        });
    });

    /* test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            for(var i = 0; i < allFeeds.length; i++){
                loadFeed(i, done);
               }
            });

        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        it('has at least single .entry element within .feed container', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function(){
        var feed0, feed1;

        beforeEach(function(done) {
            loadFeed(1, function() {
                feed1 = $('.feed').text();
                done();
            });
        });

        /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('when new feed is loaded content changes', function(done) {
            loadFeed(0, function() {
                feed0 = $('.feed').text();
                done();
            });

            expect(feed1).not.toEqual(feed0);

        });
    });
}());
