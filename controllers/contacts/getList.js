const { Contact } = require("../../models");

const getList = async (_, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getList;
