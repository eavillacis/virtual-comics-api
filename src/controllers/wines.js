const AWSXRay = require("aws-xray-sdk");
const CSVToJSON = require("csvtojson");

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

/**
 * Comics List.
 *
 * @returns {Object}
 */
exports.getWines = async (req, res) => {
  const result = await getWinesData()
  res.json(result)
}
