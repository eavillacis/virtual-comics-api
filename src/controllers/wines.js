const AWSXRay = require("aws-xray-sdk");
const CSVToJSON = require("csvtojson");

/**
 * Comics List.
 *
 * @returns {Object}
 */
exports.getComics = [
  function (req, res, next) {
    const segment = AWSXRay.getSegment();
    segment.addAnnotation("segment", "get wines data");

    try {
      CSVToJSON()
        .fromFile("https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv")
        .then((wines) => {                    
          res.json(wines);
        })
        .catch((err) => {
          // log error if any
          console.log(err);
        });
    } catch (e) {
      next(e);
    }
  },
];
