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

    const getCsvData = async () => {
      try {
        const csvFilePath =
          "https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv";
        const wines = await CSVToJSON().fromFile(csvFilePath);

        // log the JSON array
        console.log(wines);
      } catch (err) {
        console.log(err);
      }
    };

    console.log("wines ---> ", getCsvData());

    res.json(["Status OK WINES"]);

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
