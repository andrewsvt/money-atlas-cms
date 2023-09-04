const Crypto = require('crypto');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const wrapAsyncRoute = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const randomString = (size = 21) => Crypto
  .randomBytes(size)
  .toString('hex')
  .slice(0, size);

const formatReponse = ({
  data, limit, offset, total,
}) => ({
  meta: { limit, offset, total },
  data,
});

const getNextCheck = (controlInterval) => {
  if (controlInterval === '5 minutes') return moment.utc().add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss ZZ');
  const [number, interval] = controlInterval.split(' ');

  return moment.utc().add(number, interval).startOf('day');
};

const generatePassword = async (password) => bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt));

const getStatus = ({ status, nextCheck }) => {
  if (status === 'deviation') return status;

  return moment.utc().isAfter(nextCheck) ? 'waiting' : 'checked';
};

const formatDate = (date) => {
  if (!date) return null;
  return `${moment.utc(date).format('YYYY-MM-DD HH:mm:ss')}`;
};

const getPaginationRanges = (range) => {
  const [from, to] = JSON.parse(range);
  return [from, to + 1];
};

module.exports = {
  wrapAsyncRoute,
  randomString,
  formatReponse,
  generatePassword,
  getNextCheck,
  getStatus,
  formatDate,
  getPaginationRanges,
};
