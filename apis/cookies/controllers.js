let cookies = require("../../cookies");

exports.cookieCreate = (req, res) => {
  const id = cookies[cookies.length - 1].id + 1;
  const newCookie = { id, ...req.body }; //id is equivalent to id: id
  cookies.push(newCookie);
  res.status(201).json(newCookie);
};

exports.cookieList = (req, res) => res.json(cookies);

exports.cookieDetail = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    res.json(foundCookie);
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};

exports.cookieUpdate = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    for (const key in req.body) foundCookie[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};

exports.cookieDelete = (req, res) => {
  const { cookieId } = req.params;
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Cookie not found" });
  }
};
