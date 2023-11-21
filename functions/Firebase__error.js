export function Switcher(error, email) {
    let message;

    switch (error.code) {
        case 'auth/email-already-in-use':
            message = `Email address ${email} already in use.`;
            break;
        case 'auth/invalid-email':
            message = `Email address ${email} is invalid.`;
            break;
        case 'auth/operation-not-allowed':
            message = `Error during sign up.`;
            break;
        case 'auth/weak-password':
            message = 'Password is not strong enough. Add additional characters including special characters and numbers.';
            break;
        case 'auth/missing-password':
            message = "Missing password";
            break;
        case 'auth/wrong-password':
            message = "Wrong password";
            break;
        case 'auth/user-not-found':
            message = "User doesn't exist";
            break;
        default:
            message = error.message;
            break;
    }
    return message;
}