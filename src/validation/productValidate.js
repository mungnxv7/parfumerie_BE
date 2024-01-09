import Joi from "joi";

export const porductValidate = Joi.object({
  nameProduct: Joi.string().required().min(3).max(255).messages({
    "string.empty": "Tên sản phẩm không dược bỏ trống !",
    "string.min": "Tên sản phẩm phải có ít nhất 3 kí tự",
    "string.max": "Tên sản phẩm không quá 255 ký tự",
  }),
  price: Joi.number().required().min(1).messages({
    "number.empty": "Giá tiền không dược bỏ trống !",
    "number.min": "Giá tiền phải lớn hơn 0",
  }),
  id_subcategory: Joi.string().required().messages({
    "string.empty": "Danh mục không dược bỏ trống !",
  }),
  image: Joi.object().required().messages({
    "any.required": "Vui lòng cung cấp ảnh sản phẩm.",
    "object.base": "Ảnh sản phẩm không dược bỏ trống !",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Danh mục không dược bỏ trống !",
  }),
  info_details: Joi.object({
    age: Joi.number().min(1).required().messages({
      "number.empty": "Age không được bỏ trống!",
      "number.min": "Age phải lớn hơn 0",
    }),
    father: Joi.string().required().messages({
      "string.empty": "Father không được bỏ trống!",
    }),
    mother: Joi.string().required().messages({
      "string.empty": "Mother không được bỏ trống!",
    }),
    health: Joi.string().required().messages({
      "string.empty": "Health không được bỏ trống!",
    }),
    sex: Joi.string().required().messages({
      "string.empty": "Sex không được bỏ trống!",
    }),
    vaccination: Joi.string().required().messages({
      "string.empty": "Vaccination không được bỏ trống!",
    }),
  }),
}).options({ abortEarly: false });
