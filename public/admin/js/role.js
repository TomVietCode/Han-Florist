// Table Permissions
const buttonSubmitPermissions = document.querySelector(
  "[button-submit-permissions]"
)

if (buttonSubmitPermissions) {
  const tablePermissions = document.querySelector("[table-permissions]")
  const rows = tablePermissions.querySelectorAll("tr[data-name]")

  buttonSubmitPermissions.addEventListener("click", () => {
    let roles = []
    rows.forEach((row) => {
      const dataName = row.getAttribute("data-name")
      const inputs = row.querySelectorAll("input")

      if (dataName == "id") {
        inputs.forEach((input) => {
          roles.push({
            id: input.value,
            permissions: [],
          })
        })
      } else {
        inputs.forEach((input, index) => {
          if (input.checked) {
            roles[index].permissions.push(dataName)
          }
        })
      }
    })

    if (roles.length > 0) {
      const formChangePermissions = document.querySelector(
        "[form-change-permissions]"
      )
      const inputRoles = formChangePermissions.querySelector(
        'input[name="roles"]'
      )

      inputRoles.value = JSON.stringify(roles)
      formChangePermissions.submit()
    }
  })
}
// End Table Permissions

// Default Checked Permissions
const dataRecords = JSON.parse(
  document.querySelector("[data-records]").getAttribute("data-records")
)
const tablePermissions = document.querySelector("[table-permissions]")
dataRecords.forEach((item, index) => {
  const listPermissions = item.permissions

  listPermissions.forEach((permission) => {
    const row = tablePermissions.querySelector(`tr[data-name=${permission}]`)
    const inputs = row.querySelectorAll("input")[index]
    inputs.checked = true
  })
})
// End Default Checked Permissions

// Check Multi
const inputCheckAllElements = document.querySelectorAll(".inputCheckAll")
inputCheckAllElements.forEach((inputCheckAll) => {
  const columnIndex = inputCheckAll.getAttribute("data-column")
  const checkboxes = document.querySelectorAll(
    `.checkbox[data-column="${columnIndex}"]`
  )

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      checkboxes.forEach((input) => {
        input.checked = true
      })
    } else {
      checkboxes.forEach((input) => {
        input.checked = false
      })
    }
  })

  let countChecked = document.querySelectorAll(
    `.checkbox[data-column="${columnIndex}"]:checked`
  ).length
  inputCheckAll.checked = countChecked == checkboxes.length ? true : false

  checkboxes.forEach((input) => {
    input.addEventListener("click", () => {
      let countChecked = document.querySelectorAll(
        `.checkbox[data-column="${columnIndex}"]:checked`
      ).length
      inputCheckAll.checked = countChecked == checkboxes.length ? true : false
    })
  })
})
// End Check Multi
