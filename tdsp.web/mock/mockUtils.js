
const toPage = function (req, res, data) {
  let query = req.query || {}
  let arr = data || []
  let p = Number(query.page || 1)
  let itemsCount = arr.length
  let size = Number(query.pageSize || 20)

  let result = {
    page: {
      total: itemsCount,
      pages: Math.ceil(itemsCount / size),
      pageSize: size,
      page: p
    },
    values: arr.slice((p - 1) * size, p * size - 1)
  }
  if (res) {
    res.send(result)
  }
}

const findKeyName = function (data) {
  if (data && Array.isArray(data) && data.length > 0) {
    let first = data[0]
    return Object.getOwnPropertyNames(first).find(n => n.endsWith('Id'))
  } else {
    return 'Id'
  }
}

const getById = function (id, res, data, idfield) {
  // let id = req.params.id
  if (!idfield) {
    idfield = findKeyName(data)
  }
  return res.send(data.find(function (e) {
    return e[idfield] === id
  }))
}

const update = function (req, res, data) {
  // return res.send({ status: 'ok', message: '修改成功！' })
  return res.send({ code: 0 })
}

const create = function (req, res, data) {
  // return res.send({ status: 'ok', message: '新增成功！' })
  return res.send({ code: 0 })
}

const deleteById = function (req, res, data) {
  // return res.send({ status: 'ok', message: '删除成功！' })
  return res.send({ code: 0 })
}

export default {
  toPage,
  findKeyName,
  getById,
  update,
  create,
  deleteById
}
