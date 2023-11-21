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
  category: Joi.string().required().max(255).min(1).messages({
    "string.empty": "Danh mục sản phẩm không dược bỏ trống !",
    "string.max": "Danh mục sản phẩm không quá 255 ký tự",
  }),
  image: Joi.string().required().max(255).min(1).messages({
    "string.empty": "Ảnh sản phẩm không dược bỏ trống !",
    "string.min": "Ảnh sản phẩm phải có ít nhất 1 kí tự",
    "string.max": "Ảnh sản phẩm không quá 255 ký tự",
  }),
});
