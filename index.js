const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;
let cors = require('cors');

app.use(cors());

app.use(express.static('static'));

let hotelsData = require('./hotels.js');
const hotels = require('./hotels.js');

app.get('/hotels', (req, res) => {
  res.json({ hotels: hotelsData });
});

function sortByPriceASC(p1, p2) {
  return p1.price - p2.price;
}
function sortByPriceDESC(p1, p2) {
  return p2.price - p1.price;
}

app.get('/hotels/sort/pricing', (req, res) => {
  let condition = req.query.pricing;
  let sortedHotels;
  if (condition === 'low-to-high') {
    sortedHotels = hotelsData.sort(sortByPriceASC);
  } else if (condition === 'high-to-low') {
    sortedHotels = hotelsData.sort(sortByPriceDESC);
  }

  res.json({ hotels: sortedHotels });
});

function sortByRateASC(rate1, rate2) {
  return rate1.rating - rate2.rating;
}
function sortByRateDESC(rate1, rate2) {
  return rate2.rating - rate1.rating;
}

app.get('/hotels/sort/rating', (req, res) => {
  let condition = req.query.rating;
  let sortedHotels;
  if (condition === 'low-to-high') {
    sortedHotels = hotelsData.sort(sortByRateASC);
  } else if (condition === 'high-to-low') {
    sortedHotels = hotelsData.sort(sortByRateDESC);
  }
  res.json({ hotels: sortedHotels });
});

function sortByReviewsLeast(review1, review2) {
  return review1.reviews - review2.reviews;
}

function sortByReviewsMost(review1, review2) {
  return review2.reviews - review1.reviews;
}

app.get('/hotels/sort/reviews', (req, res) => {
  let condition = req.query.reviews;
  let sortedHotels;
  if (condition === 'least-to-most') {
    sortedHotels = hotelsData.sort(sortByReviewsLeast);
  } else if (condition === 'most-to-least') {
    sortedHotels = hotelsData.sort(sortByReviewsMost);
  }
  res.json({ hotels: sortedHotels });
});

function filterByAmenity(data, amenity) {
  return data.amenity.toLowerCase() === amenity.toLowerCase();
}

app.get('/hotels/filter/amenity', (req, res) => {
  let amenity = req.query.amenity;
  let filterHotels = hotelsData.filter((ele) => filterByAmenity(ele, amenity));
  res.json({ hotels: filterHotels });
});

function filterByCountry(data, country) {
  return data.country.toLowerCase() === country.toLowerCase();
}
app.get('/hotels/filter/country', (req, res) => {
  let givenCountry = req.query.country;
  let filterHotels = hotelsData.filter((ele) =>
    filterByCountry(ele, givenCountry)
  );
  res.json({ hotels: filterHotels });
});

function filterByCategory(data, category) {
  return data.category.toLowerCase() === category.toLowerCase();
}
app.get('/hotels/filter/category', (req, res) => {
  let givenCategory = req.query.category;
  let filterHotels = hotelsData.filter((ele) =>
    filterByCategory(ele, givenCategory)
  );
  res.json({ hotels: filterHotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
