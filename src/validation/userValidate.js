import Joi from "joi";

const SchemaUser = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được bỏ trống",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được bỏ trống",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": "Mật khẩu phải có số và chữ in hoa",
      "string.empty": "Mật khẩu không được bỏ trống",
      "string.min": "Mật khẩu phải từ 6 ký tự trở lên",
      "string.max": "Mật khẩu không quá 20 ký tự",
    }),
  role: Joi.string().required().messages({
    "string.empty": "Role không được bỏ trống",
  }),
}).options({ abortEarly: false });

const validateLogin = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password không được để trống",
  }),
});
export { SchemaUser, validateLogin };
