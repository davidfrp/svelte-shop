<script>
    import TextInput from "../components/TextInput.svelte";
    import Toast from "../components/Toast.svelte";
    import { login, sendResetPasswordEmail } from "../services/authService.js";
    import { navigate } from "svelte-navigator";
    
    let dynamicErrorMessage;
    let email, password;
    let hasForgottenPassword;
    let hasTriedLogin;
    let isEmailValid;
    let recoveryEmail;

    const handleForgotPassword = async (email) => {
        hasForgottenPassword = true;
        if (isEmailValid) {
            await sendResetPasswordEmail(email);
            recoveryEmail = email;
        }
    };
    
    const handleSubmit = async () => {
        hasTriedLogin = true;

        try {
            await login(email, password);
            navigate("/");
        } catch (error) {
            dynamicErrorMessage = error.message;
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1>Welcome back</h1>
    <Toast isShown={recoveryEmail}
        message={`An email has been sent to <strong>${recoveryEmail}</strong> with a link to reset your password.`} />
    <TextInput 
        id="email" 
        label="E-mail" 
        validation={[{
            state: /^\S+@\S+\.\S+$/.test(email) || email?.length === 0,
            errorMessage: "Email is malformed"
        },{
            state: email?.length > 0,
            errorMessage: "We don't know who you are... yet... Please enter your email",
            ignorePristine: hasTriedLogin || hasForgottenPassword
        },{
            state: !dynamicErrorMessage,
            errorMessage: dynamicErrorMessage
        }]}
        onValidityChanged={(value) => isEmailValid = value}
        bind:value={email} />
    <TextInput 
        isPassword 
        validation={[{
            state: password?.length > 0 || hasForgottenPassword,
            errorMessage: "We can't log you in without a password",
            ignorePristine: hasTriedLogin
        }]}
        id="password" 
        label="Password" 
        bind:value={password} />
    <button type="button" class="link-alike" on:click={handleForgotPassword(email)}>
        Forgot your password?
    </button>
    <button type="submit">
        Log in
    </button>
    <a href="/register">Don't have an account yet?</a>
</form>