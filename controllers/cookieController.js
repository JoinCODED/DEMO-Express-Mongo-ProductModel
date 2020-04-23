const cookieMethods = require("../cookieMethods");

exports.cookieList = async (req, res) => {
  try {
    const cookies = await cookieMethods.getCookies();
    res.json(cookies);
  } catch (error) {
    console.log("Error while fetching cookies", error);
  }
};

exports.cookieDetail = async (req, res) => {
  try {
    const { cookieId } = req.params;
    const cookie = await cookieMethods.getCookie(cookieId);
    res.json(cookie);
  } catch (error) {
    console.log("Error while fetching cookie", error);
  }
};

exports.cookieCreate = async (req, res) => {
  try {
    const newCookie = await cookieMethods.createCookie(req.body);
    res.status(201).json(newCookie);
  } catch (error) {
    console.log("Error while creating a new cookie", error);
  }
};

exports.cookieUpdate = async (req, res) => {
  const { cookieId } = req.params;
  try {
    const foundCookie = await cookieMethods.getCookie(cookieId);
    let updatedCookie = { ...foundCookie, ...req.body };
    await cookieMethods.updateCookie(updatedCookie);
    res.status(204).end();
  } catch (error) {
    console.log("Error while updating a cookie!", error);
  }
};

exports.cookieDelete = async (req, res) => {
  const { cookieId } = req.params;
  try {
    await cookieMethods.deleteCookie(cookieId);
    res.status(204).end();
  } catch (error) {
    console.log("Error while deleting a cookie!", error);
  }
};
