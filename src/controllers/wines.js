const AWSXRay = require("aws-xray-sdk");
const CSVToJSON = require("csvtojson");

/**
 * Comics List.
 *
 * @returns {Object}
 */
exports.getWines = [
  function (req, res, next) {
    const segment = AWSXRay.getSegment();
    segment.addAnnotation("segment", "get wines data");

    try {
      const csvFilePath = "https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv"
      const wines = await CSVToJSON().fromFile(csvFilePath);

      res.json(wines);
    } catch (e) {
      next(e);
    }

    // try {
    //   CSVToJSON()
    //     .fromFile("https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv")
    //     .then((wines) => {
    //       console.log('WINES ---> ', wines)   
    //       res.json(["Status OK WINES"]);       
    //     })
    //     .catch((err) => {
    //       // log error if any
    //       console.log(err);
    //     });
    // } catch (e) {
    //   next(e);
    // }
  },
];
