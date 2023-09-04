const createError = require('http-errors');
const knex = require('../dbs/pg/knex');
const { ADMINS_TABLE } = require('../constants/tables');

const create = async ({ username, password }) => {
  const building = await knex(ADMINS_TABLE).insert({
    username,
    password,
  }).returning(['id']);

  return building[0];
};

const get = async ({ username }) => {
  const user = await knex(ADMINS_TABLE)
    .select()
    .where({
      username,
    })
    .limit(1)
    .first();

  return user;
};

const getById = async ({ id }) => {
  const user = await knex(ADMINS_TABLE)
    .select()
    .where({
      id,
    })
    .limit(1)
    .first();

  return user;
};

const update = async ({ id, body }) => {
  const result = await knex(ADMINS_TABLE)
    .update(body)
    .where({
      id,
    })
    .returning(['id', 'username']);

  if (!result.length) {
    throw createError(404);
  }

  return result;
};

const list = async ({
  limit = 10, offset = 0, sort, q,
}) => {
  const { sortField, direction } = sort;

  const query = knex(ADMINS_TABLE)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy(sortField, direction);

  if (q) {
    query.where(knex.raw(`
      username like '%${q}%'
    `));
  }

  const results = await query;

  return results;
};

const count = async ({ q }) => {
  const query = knex(ADMINS_TABLE)
    .count('id');

  if (q) {
    query.where(knex.raw(`
      username like '%${q}%'
    `));
  }
  const results = await query;

  return results[0].count;
};

const del = async ({ id }) => {
  const results = await knex(ADMINS_TABLE)
    .where({ id })
    .del()
    .returning('id');

  if (!results.length) {
    throw createError(404);
  }

  return results;
};

module.exports = {
  getById,
  create,
  update,
  count,
  list,
  get,
  del,
};
