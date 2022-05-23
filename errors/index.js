const CustomApiError=require('./customApiError')
const BadRequestError=require('./badRequest')
const NotFoundError=require('./notFoundError')
const UnauthenticatedError=require('./unauthenticated')

module.exports={
    CustomApiError,
    BadRequestError,
    NotFoundError,
    UnauthenticatedError
}