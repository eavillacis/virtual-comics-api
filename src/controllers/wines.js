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
    const getWinesData = async () => {
      try {
        const csvFilePath =
          "https://wines-assets.s3-us-west-2.amazonaws.com/wines.csv";
        wines = await CSVToJSON().fromFile(csvFilePath);
        return wines
      } catch (err) {
        console.log(err);
      }
    };

    const result = await getWinesData(items);

    console.log("wines ---> ", wines);
    console.log("result ---> ", result);

    res.json(["Status OK WINES"]);
  },
];
