const Setting = require("../../models/setting-general.model")

module.exports.setting = async (req, res, next) => {
  const setting = await Setting.findOne({})

  if(setting){
    res.locals.setting = setting
  }

  next()
}