<script>
    import TextInput from "../components/TextInput.svelte";
    import { queryParams } from "../services/navigatorHelper.js";
    import { resetPassword } from "../services/authService.js";
    
    let hasBeenSubmitted;
    let password, passwordConfirm;
    let isPasswordValid, isPasswordConfirmValid;
    $: isValid = isPasswordValid && isPasswordConfirmValid;

    const handleSubmit = async () => {
        hasBeenSubmitted = true;
        const { code } = queryParams();
        await resetPassword(code, password);
    };
</script>

<form on:submit|preventDefault={handleSubmit}>
    <h1>Reset password</h1>
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
        id="password"
        label="New password" 
        bind:value={password} />
    <TextInput 
        isPassword 
        validation={[{
            state: password === passwordConfirm,
            errorMessage: "Passwords don't match",
            ignorePristine: hasBeenSubmitted
        }]}
        onValidityChanged={(value) => isPasswordConfirmValid = value}
        id="passwordConfirm" 
        label="Confirm new password" 
        bind:value={passwordConfirm} />
    <button>Reset password</button>
</form>