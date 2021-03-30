const isFormValid = (formState, defaultState, setState) => {
  let result = true
  let formErrors = {...defaultState}
  let errorCount = 0
  for (let field in formState) {
    if (!formState[field]) {
      formErrors[field].push('Can not be empty')
      errorCount++
    }
  }

  if (errorCount > 0) {
    setState({...formErrors})
    result = false
  }

  return result
}

const getErrorText = (formErrors, field) => {
  return formErrors[field].length > 0 ? formErrors[field].join(', ') : null
}

export {isFormValid, getErrorText}
