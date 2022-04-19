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
    let hasBeenSubmitted;

    const handleSubmit = async () => {
        hasBeenSubmitted = true;

        if (isValid) {
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
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1>Create an account</h1>
    <TextInput 
        validation={[{
            state: /^\S+@\S+\.\S+$/.test(email) || email?.length === 0,
            errorMessage: "Email is not well formed",
            ignorePristine: hasBeenSubmitted
        },{
            state: email?.length > 0,
            errorMessage: "We don't know who you are... yet... Please enter your email",
            ignorePristine: hasBeenSubmitted
        },{
            state: email !== existingEmail,
            errorMessage: "Email is already registered"
        }]}
        onValidityChanged={(value) => isEmailValid = value}
        id="email" 
        label="E-mail" 
        bind:value={email} />
    <TextInput 
        validation={[{
            state: username?.length >= 2 && username?.length <= 32,
            errorMessage: "Usernames must be between 2 and 32 characters long",
            ignorePristine: hasBeenSubmitted
        },{
            state: username !== existingUsername,
            errorMessage: "Username is already taken"
        }]}
        onValidityChanged={(value) => isUsernameValid = value}
        maxLength=32
        id="username" 
        label="Username" 
        bind:value={username} />
    <TextInput 
        isPassword 
        validation={[{
            state: password?.length > 0,
            errorMessage: "You will need a password to log in",
            ignorePristine: hasBeenSubmitted
        },{
            state: /[A-Z]/.test(password) || password?.length === 0,
            errorMessage: "Use 1 or more uppercase letters",
            ignorePristine: hasBeenSubmitted
        },{
            state: /[a-z]/.test(password) || password?.length === 0,
            errorMessage: "Use 1 or more lowercase letters",
            ignorePristine: hasBeenSubmitted
        },{
            state: /\d/.test(password) || password?.length === 0,
            errorMessage: "Use 1 or more numbers",
            ignorePristine: hasBeenSubmitted
        },{
            state: password?.length >= 8 || password?.length === 0,
            errorMessage: "Use 8 or more characters",
            ignorePristine: hasBeenSubmitted
        }]}
        onValidityChanged={(value) => isPasswordValid = value}
        autoComplete="new-password"
        id="password"
        label="Password" 
        bind:value={password} />
    <TextInput 
        isPassword 
        validation={[{
            state: password === passwordConfirm,
            errorMessage: "Passwords don't match",
            ignorePristine: hasBeenSubmitted
        }]}
        onValidityChanged={(value) => isPasswordConfirmValid = value}
        autoComplete="new-password"
        id="passwordConfirm" 
        label="Confirm password" 
        bind:value={passwordConfirm} />
    <button>Create account</button>
    <a href="/login">Already have an account?</a>
</form>