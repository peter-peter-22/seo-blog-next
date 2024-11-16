export function formatAuthError(error) {
    console.error(error);
    switch (error) {
        case "CredentialsSignin":
            return "Invalid crendentials";
        default:
            return error.toString();
    }
}