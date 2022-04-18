<script>
    import TextInput from "../components/TextInput.svelte";
    import { navigate } from "svelte-navigator";
    import { token } from "../stores/authStore";
    
    let email, password;
    let hasBeenSubmitted;
    let isPasswordValid = true;

    const login = async (email, password) => {
        return fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
    };

    const handleForgotPassword = async (email) => {
        await fetch("http://localhost:3000/auth/forgot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
    };
    
    const handleSubmit = async () => {
        hasBeenSubmitted = true;
        
        const response = await login(email, password);
        const data = await response.json();

        if (response?.ok) {
            token.set(data.token);
            navigate("/", { replace: true });
        } else {
            isPasswordValid = true;
            if (data?.code === "PASSWORD_INVALID") {
                isPasswordValid = false;
            }
        }
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1>Welcome back</h1>
    <TextInput 
        id="email" 
        label="E-mail" 
        validation={[{
            state: /^\S+@\S+\.\S+$/.test(email) || email?.length === 0,
            errorMessage: "Email is malformed."
        },{
            state: email?.length > 0,
            errorMessage: "We don't know who you are... yet... Please enter your email.",
            ignorePristine: hasBeenSubmitted
        },{
            state: isPasswordValid,
            errorMessage: "Wrong email or password."
        }]}
        bind:value={email} />
    <TextInput 
        isPassword 
        validation={[{
            state: password?.length > 0,
            errorMessage: "We can't log you in without a password.",
            ignorePristine: hasBeenSubmitted
        }]}
        id="password" 
        label="Password" 
        bind:value={password} />
    <button class="link-alike" on:click={handleForgotPassword(email)}>Forgot your password?</button>
    <button type="submit">Log in</button>
    <a href="/register">Don't have an account yet?</a>
</form>