const Joi = require('joi');

const bookingSchema = Joi.object({
  bookingDate: Joi.date().required().messages({
    'date.base': 'Booking date must be a valid date',
    'any.required': 'Booking date is required',
  }),
  bookingTime: Joi.string().required().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).messages({
    'string.empty': 'Booking time is required',
    'string.pattern.base': 'Booking time must be in HH:MM format (e.g., 14:30)',
    'any.required': 'Booking time is required',
  }),
  bookingType: Joi.string().required().valid('Hour', 'Day', 'Week', 'Month').messages({
    'any.only': 'Booking type must be Hour, Day, Week, or Month',
    'any.required': 'Booking type is required',
  }),
  location: Joi.string().required().min(2).max(100).trim().messages({
    'string.empty': 'Location is required',
    'string.min': 'Location must be at least 2 characters long',
    'string.max': 'Location cannot exceed 100 characters',
    'any.required': 'Location is required',
  }),
  professionalId: Joi.string().optional().messages({
    'string.empty': 'Professional ID is required',
  }),
}).custom((value, helpers) => {
  const { bookingDate, bookingTime } = value;

  // Combine bookingDate and bookingTime into a single Date object
  const [hours, minutes] = bookingTime.split(':').map(Number);
  const combinedDateTime = new Date(bookingDate);
  combinedDateTime.setHours(hours, minutes, 0, 0);

  // Check if the combined date/time is in the past
  const now = new Date();
  if (combinedDateTime < now) {
    return helpers.error('date.past', {
      message: 'Booking date and time cannot be in the past',
    });
  }

  return value; // Return the value if validation passes
}).required().messages({
  'object.base': 'Booking data is required',
});

module.exports = { bookingSchema };