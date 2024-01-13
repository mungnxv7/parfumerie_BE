import Joi from "joi";

export const hotelValidate = Joi.object({
  hotelName: Joi.string().required().min(3).max(255).messages({
    "string.empty": "Tên sản phẩm không được bỏ trống !",
    "string.min": "Tên sản phẩm phải có ít nhất 3 kí tự",
    "string.max": "Tên sản phẩm không quá 255 ký tự",
  }),
  hotelType: Joi.string().required().messages({
    "string.empty": "Kiểu khách sạn không được bỏ trống !",
  }),
  address: {
    province: Joi.string().required().messages({
      "string.empty": "Thành phố / tỉnh không dược bỏ trống !",
    }),
    district: Joi.string().required().messages({
      "string.empty": "Quận / huyện không được bỏ trống !",
    }),
    ward: Joi.string().required().messages({
      "string.empty": "Phường / xã không được bỏ trống !",
    }),
    street_address: Joi.string().required().messages({
      "string.empty": "số nhà / đường không được bỏ trống !",
    }),
  },
  hotelImage: Joi.string().required().messages({
    "string.empty": "Ảnh không được bỏ trống !",
  }),
  descreiptionHotel: Joi.string().required().messages({
    "string.empty": "Mô tả không dược bỏ trống !",
  }),
  ranking: Joi.number().required().messages({
    "string.empty": "xếp hạng không được bỏ trống !",
  }),
}).options({ abortEarly: false });
