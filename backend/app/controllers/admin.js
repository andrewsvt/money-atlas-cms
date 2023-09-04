const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const { wrapAsyncRoute, getPaginationRanges } = require('../lib/helpers');
const { adminsService } = require('../services');

const generatePassword = async (password) => bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt));

const login = wrapAsyncRoute(async (req, res) => {
  const { username, password } = req.body;

  const admin = await adminsService.get({ username });

  if (!admin) throw createError(403, 'Wrong email or password');

  const { password: currentPassword, ...restUser } = admin;

  const isPasswordValid = await bcrypt.compare(password, currentPassword);

  if (!isPasswordValid) {
    throw createError(403, 'Wrong email or password');
  }

  req.session.user = restUser;
  req.session.isAuth = true;

  return res.status(200).send();
});

const logout = wrapAsyncRoute(async (req, res) => {
  res.set('Content-Range', 0);
  req.session.destroy(() => res.status(200).end());
});

const list = wrapAsyncRoute(async (req, res) => {
  const { filter, range = '[]', sort = '[]' } = req.query;

  const [from, to] = getPaginationRanges(range);
  const { q, id } = JSON.parse(filter);
  const [sortField = 'id', direction = 'ASC'] = JSON.parse(sort);

  const [accounts, total] = await Promise.all([
    adminsService.list({
      limit: to - from,
      offset: from,
      sort: {
        sortField,
        direction,
      },
      filter: {
        id,
      },
      q,
    }),
    adminsService.count({ q }),
  ]);

  res.set('Content-Range', +total);

  return res.status(200).json(accounts);
});

const create = wrapAsyncRoute(async (req, res) => {
  const { username, password } = req.body;

  const hash = await generatePassword(password);

  const admin = await adminsService.create({
    username,
    password: hash,
  });

  return res.status(201).json(admin);
});

const del = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const result = await adminsService.del({ id });

  return res.status(200).json(result);
});

const get = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const { password, ...admin } = await adminsService.getById({ id });

  return res.status(200).json(admin);
});

const update = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const { username, password } = req.body;

  const hash = await generatePassword(password);

  const admin = await adminsService.update({
    id,
    body: { username, password: hash },
  });

  return res.status(201).json(admin[0]);
});

module.exports = {
  login,
  logout,
  list,
  create,
  get,
  del,
  update,
};
