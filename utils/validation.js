function validateDate(date) {
  return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(date)
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateAuthorPayLoad(payload) {
  const { firstName, lastName, email, DOB } = payload;
  const error = {
    message: ''
  }
  if (!firstName || (firstName && firstName.trim().length < 2)) {
    error.message = 'firstName should not be less than 2 characters';
    return error;
  }

  if (!lastName || (lastName && lastName.trim().length < 2)) {
    error.message = 'lastName should not be less than 2 characters';
    return error;
  }

  if (!validateEmail(email)) {
    error.message = 'email is not valid';
    return error;
  }

  if (!validateDate(DOB)) {
    error.message = 'DOB should be in the format dd/mm/yyyy, dd-mm-yyyy or dd.mm.yyyy';
    return error;
  }
  return false;
}

function validateId(id) {
  if (!id) {
    return false;
  }
  return /^[0-9]*$/.test(id);
}

function validatePublicationPayLoad(payload) {
  const { title, body, authorId } = payload;
  const error = {
    message: ''
  }
  if (!title || (title && title.trim().length < 2)) {
    error.message = 'Title field is not allowed to be less than 2 characters';
    return error;
  }

  if (!body || (body && body.trim().length < 10)) {
    error.message = 'Title field is not allowed to be less than 10 characters';
    return error;
  }

  if (!authorId || !(validateId(authorId))) {
    error.message = 'Author id is invalid';
    return error;
  }
  return false
}

module.exports = {
  validateAuthorPayLoad,
  validateDate,
  validateEmail,
  validatePublicationPayLoad,
  validateId
}