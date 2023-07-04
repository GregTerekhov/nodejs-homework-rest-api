const { Contact } = require("../../models");
const { NotFound } = require("http-errors");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!favorite) {
    res.status(400);
    res.json({
      status: "error",
      code: 400,
      message: "Missing field favorite",
    });
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Contact with a such id=${contactId} not found`);
  }
  res.status(200);
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = updateStatus;
