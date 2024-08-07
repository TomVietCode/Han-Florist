const Setting = require("../../models/setting-general.model")

// [GET] /settings/general
module.exports.general = (req, res) => {
  res.render("admin/pages/settings/general", {
    pageTitle: "Cài đặt chung"
  })
}

// [PATCH] /settings/general
module.exports.generalPatch = async (req, res) => {
  const setting = await Setting.findOne({})
  if(!setting){
    const settingObject = new Setting(req.body)
    await settingObject.save()
  }else{
    try {
      await Setting.updateOne({
        _id: setting.id
      }, req.body)
      req.flash("success", "Cập nhật thành công!")
    } catch (error) {
      req.flash("error", "Cập nhật thất bại!")
    }
  }

  res.redirect("back")
}