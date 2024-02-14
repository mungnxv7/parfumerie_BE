import Joi from "joi";

const categoryValidate = Joi.object({
  nameCategories: Joi.string().required().messages({
    "string.empty": "Tên danh mục không được bỏ trống",
  }),
});

export default categoryValidate;
