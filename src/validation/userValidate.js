import Joi from "joi";

const SchemaUser = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên không được bổ trống",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được bổ trống",
    "string.email": "Email không đúng định dạng",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/)
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.pattern.base": "Mật khẩu phải có số và chữ in hoa",
      "string.empty": "Mật khẩu không được bổ trống",
      "string.min": "Mật khẩu phải từ 6 ký tự trở lên",
      "string.max": "Mật khẩu không quá 20 ký tự",
    }),
}).options({ abortEarly: false });

export default SchemaUser;
