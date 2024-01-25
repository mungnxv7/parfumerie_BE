import Joi from "joi";

const categoryValidate = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Tên danh mục không được bỏ trống",
  }),
});

export default categoryValidate;
