import Joi from "joi";

export const productValidate = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    "string.empty": "Tên sản phẩm không được bỏ trống !",
    "string.min": "Tên sản phẩm phải có ít nhất 3 kí tự",
    "string.max": "Tên sản phẩm không quá 255 ký tự",
  }),
  productType: Joi.string().required().messages({
    "string.empty": "Loại nước hoa không được bỏ trống !",
  }),
  productBrand: Joi.string().required().messages({
    "string.empty": "Thương hiệu không được bỏ trống !",
  }),
  image: {
    path: Joi.string().required().messages({
      "string.empty": "Ảnh không được bỏ trống !",
    }),
    filename: Joi.string().required().messages({
      "string.empty": "Ảnh không được bỏ trống !",
    }),
  },
  descreiption: Joi.string().required().messages({
    "string.empty": "Mô tả không dược bỏ trống !",
  }),
}).options({ abortEarly: false });
