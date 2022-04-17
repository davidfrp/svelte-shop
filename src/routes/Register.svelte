<script>
    import TextInput from "../components/TextInput.svelte";
    import { navigate } from "svelte-navigator";
    
    let email, username, password, passwordConfirm;
    
    const registerUser = async (email, username, password) => {
        return fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, password })
        });
    };

    let isEmailValid, isUsernameValid, isPasswordValid, isPasswordConfirmValid;
    $: isValid = isEmailValid && isUsernameValid && isPasswordValid && isPasswordConfirmValid;

    let existingUsername, existingEmail;

    const handleSubmit = async () => {
        const response = await registerUser(email, username, password);
        
        if (response.status === 204) {
            navigate("/profile", { replace: true });
        } else {
            const data = await response.json();
            if (data?.code === "USERNAME_TAKEN") {
                existingUsername = username;
            } else if (data?.code === "EMAIL_ALREADY_REGISTERED") {
                existingEmail = email;
            }
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1>Create an account</h1>
    <TextInput 
        validation={[{
            state: /^\S+@\S+\.\S+$/.test(email),
            errorMessage: "Email is not well formed."
        },{
            state: email !== existingEmail,
            errorMessage: "Email is already registered."
        }]}
        onValidityChanged={(value) => isEmailValid = value}
        id="email" 
        label="E-mail" 
        bind:value={email} />
    <TextInput 
        validation={[{
            state: username?.length >= 2 && username?.length <= 32,
            errorMessage: "Usernames must be between 2 and 32 characters long."
        },{
            state: username !== existingUsername,
            errorMessage: "Username is already taken."
        }]}
        onValidityChanged={(value) => isUsernameValid = value}
        maxLength=32
        id="username" 
        label="Username" 
        bind:value={username} />
    <TextInput 
        isPassword 
        validation={[{
            state: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(password),
            errorMessage: "Use at least one uppercase letter, one lowercase letter, and one number."
        },{
            state: password?.length >= 8,
            errorMessage: "Use 8 or more characters."
        }]}
        onValidityChanged={(value) => isPasswordValid = value}
        id="password"
        label="Password" 
        bind:value={password} />
    <TextInput 
        isPassword 
        validation={[{
            state: password === passwordConfirm,
            errorMessage: "Passwords didn't match. Try again."
        }]}
        onValidityChanged={(value) => isPasswordConfirmValid = value}
        id="passwordConfirm" 
        label="Confirm password" 
        bind:value={passwordConfirm} />
    <button disabled={!isValid}>Create account</button>
    <a href="/login">Already have an account?</a>
</form>