export const endPoints = {
    auth: {
        login: "customer-login",
        register: "customer-registration",
        forgot_password: "forgot-password",
        verify_otp: "forgot-password-otp-verification",
        reset_password: "auth/profile/update-customer-password",
        reset_confirmation: "password-confirmation"
    },
    cms:{
        categories: "service/categories",
        services: "all-service",
        new_booking: "auth/service-booking",
        my_bookings: "auth/get-booking-by-customer/"
    }
}