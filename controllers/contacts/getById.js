const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw new NotFound(`Contact with a such id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getById;
