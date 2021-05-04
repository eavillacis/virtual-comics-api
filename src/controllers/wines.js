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

    let wines;
    (async () => {
      try {
        const csvFilePath =
          "https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv";
        wines = await CSVToJSON().fromFile(csvFilePath);
      } catch (err) {
        console.log(err);
      }
    });

    console.log("wines ---> ", wines);

    res.json(["Status OK WINES"]);

  },
];
