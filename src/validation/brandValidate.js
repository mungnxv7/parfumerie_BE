import Joi from "joi";

const brandValidate = Joi.object({
  nameBrand: Joi.string().required().messages({
    "string.empty": "Tên danh mục không được bỏ trống",
  }),
});

export default brandValidate;
