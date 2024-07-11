const mongoose = require("mongoose")

const roleSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    permission: {
      type: String,
      default: []
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
  }, { timestamps: true, }
)

const Role = mongoose.model("Role", roleSchema, "roles")

module.exports = Role