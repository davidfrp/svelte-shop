<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Products from "./routes/Products.svelte";
    import Signin from "./routes/Login.svelte";
    import Signup from "./routes/Register.svelte";
    import ResetPassword from "./routes/ResetPassword.svelte";
    import Navbar from "./components/Navbar.svelte";
</script>

<Router>
    <Navbar />
    <main>
        <Route path="/">
            <Products />
        </Route>
        <Route path="/login">
            <Signin />
        </Route>
        <Route path="/register">
            <Signup />
        </Route>
        <Route path="/reset-password">
            <ResetPassword />
        </Route>
    </main>
</Router>