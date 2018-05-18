const messages = {	
        //registration cases
		"emailExist":"Email already exists",
		"registration":"Registered successfully",
		"verifyEmail":"Please check your email for verification",
		//login cases
		"notvalidEmail": "Email does not exist",
		"invalidCredentials":"Invalid credentials",
		"unauthorizedUser":"You are not authorised to login",	
		//middleware
		"tokenFailure": "Session has expired Please login again",
		"tokenSuccess": "User does not match",
		"authenticationFailure": "Failed to authenticate token",
		//logout
		"LogoutSuccess":"logout successfully",
		"errorRetreivingData": "Error occured while retreiving the data from collection",
		//category
		"categorySuccess":"Category added successfully",
		"categoryupadteSuccess":"Category updated successfully",
		"subcategoryupadteSuccess":"Subcategory updated successfully",
		//item
		"itemSuccess":"Item added successfully",
		"itemUpdate":"Item updated successfully",
		"itemDelete":"Item deleted successfully",
		"reviewSuccess":"Review added successfully",
		"checkItem":"Item exist for this category",
		//otp
		"otpmatch":"Registration successfull, Welcome to AJR",
		"otpmismatch":"Otp does not match",
		"emailVerification":"Email verified successfully",
		 "emailMismatch":"Email verification code does not match",
		//user
		"userupdateSuccess":"User updated successfully",
		"userupdateFailure":"User cannot be updated",
		//bookings
		"bookingSuccess":"Booking done successfully",
		"bookingfailure":"You have already made booking for this item",
		"noRequests":"No requests available",
		"timeMismatch":"Please enter time between provided range",
		"cancelBooking":"Your booking has been cancelled",
		"signatureUpload":'Signature uploaded successfully',
		"trackingDetails":'No tracking details available',
		//password
		"invalidPassword":"Your current password is invalid",
		"updatedPassword":"Password updated successfully",
		"addressUpdated":"Address added successfully",
		"addressUpdateFailure":"Address could not be added",
		//settings
		"settingsSaved":"Settings saved successfully",
		"settingsUpdate":"Settings updated successfully",
		//proceedConfirmation
		"proceedConfirmation":"You can proceed with the payment now",
		"bookingAccepted":"Booking accepted successfully",
		"invalidStartdate":"Your start date is not available",
		"invalidEnddate":"Your end date is not available",
		"invalidbookingStartdate":"Item is already booked by other user on this date",
		"invalidbookingEnddate":"Item is already booked by other user on this date",
		//cms
		"DataSuccess":"Data saved successfully",
		//bank
		"bankDetails":'Bank details added successfully'
}


const httpStatus = {
	success: 200,
	noContent: 204,
	badRequest: 400,
	created: 201,
	accepted: 202,
	nonAuthInfo: 203,
	unauthorized: 401,
	forbidden: 403,
	subscriptionRequired: 402,
	notAcceptable: 406,
	internalServerErr: 500,
	conflict: 409,
	found: 302,
	processing: 102,
	noDataFound: 410,
	methodNotAllowed: 405,
	middlewareAuth: 507
}

const gmailSMTPCredentials = {
	"service": "gmail",
	"host": "smtp.gmail.com",
	"username": "rentalapp62@gmail.com",
	"password": "rentalapp123"
}



var baseUrl = "http://52.34.207.5:4146";


//var baseUrl = "http://localhost:4200";


var obj = {
	messages: messages,
	httpStatus: httpStatus,
	gmailSMTPCredentials: gmailSMTPCredentials,
	baseUrl:baseUrl
};
module.exports = obj;