import { token } from "../stores/authStore";

/**
 * Logs in a user using an email and password.
 * 
 * @param {*} email Email of the user
 * @param {*} password Password of the user
 */
export const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (response?.ok) {
        token.set(data.token);
    } else {
        throw new Error(data.message);
    }
};

/**
 * Sets a new password with a one-time code.
 * 
 * @param {*} code One-time code
 * @param {*} password New password
 */
export const resetPassword = async (code, password) => {
    const response = await fetch("http://localhost:3000/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, code })
    });

    const data = await response.json();

    if (response?.ok) {
        token.set(data.token);
    } else {
        throw new Error(data.message);
    }
};

/**
 * Sends a link to reset their password.
 * 
 * @param {*} email Email address of the user
 */
export const sendResetPasswordEmail = async (email) => {
    await fetch("http://localhost:3000/auth/forgot", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });
};