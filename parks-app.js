'use strict';
const APIkey = 'p3w5LMRVyOTNse8hHdyCCCCbKKoZ7NkFRd0M9XVM';


function formWatch () {
  $('#parkSearch').submit( (event) => {
    event.preventDefault();
    const state = $('#state').val().split(' ').join(); //join+split removes spaces  
    const maxResults = $('#maxResults').val();
    
    parksQuery(state, maxResults);    

  });
}


//Send a fetch request to parks API at properly-formatted URL
function parksQuery (state, maxResults=10) {
  
  fetch (`https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${maxResults}&api_key=${APIkey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(json => {
      let data = json.data;
      let resultsHtml = dataToHtml(data);
      displayResults(resultsHtml);
    
    
    });  

}

//converts an array of objects representing park data to a single large block of HTML
function dataToHtml (data) {
  let resultsList = data.map(park => {
    let name = park.fullName;
    let description = park.description;
    let url = park.url;

    return parkHtml (name, description, url);

  });

  return resultsList;

}

//given a park's Full name, Description, and URL, returns a <li> item with formatted results
function parkHtml (name, description, url) {
  return `
  <li>
    <h3>${name}</h3>
    <p>${description}</p>
    <p>For more information, visit: <a href="${url}">${url}</a></p>
  </li>
  `;
}

//given a block of HTML, adds content to <ul#resultList>
function displayResults (html) {
  $('#resultList').html(html);
}





/*
Assignment
Your team is working on an app that will help folks plan a vacation. 
You've been assigned to work on one feature for the app - to display a list of national parks in an area.

Review The National Parks Services API documentation and create an API key.
Review the API Guide on Authentication for ways to pass your API key as part of the request.
Review the /parks endpoint and data model to understand how it works.
Create a new app and push it to GitHub.
When you're done, submit the link to your GitHub repo at the bottom of the page.
Requirements:
-The user must be able to search for parks in one or more states.
-The user must be able to set the max number of results, with a default of 10.
-The search must trigger a call to NPS's API.
The parks in the given state must be displayed on the page. Include at least:
-Full name
-Description
-Website URL
The user must be able to make multiple searches and see only the results for the current search.
As a stretch goal, try adding the park's address to the results.

This exercise should take about an hour to complete. If you're having trouble, 
attend a Q&A session or reach out on Slack for help.
*/

$(formWatch());