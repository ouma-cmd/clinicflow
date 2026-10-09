const { z } = require("zod");


const createPatientSchema = z.object({

  fullName: z
    .string()
    .min(2),

  cin: z
    .string()
    .min(2),

  phone: z
    .string()
    .min(6),

  birthDate: z
    .string(),

  address: z
    .string()
    .optional()

});


module.exports = {
  createPatientSchema
};