<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Frontpage from "./routes/Frontpage.svelte";
    import Signin from "./routes/Login.svelte";
    import Signup from "./routes/Register.svelte";
    import Navbar from "./components/Navbar.svelte";
</script>

<Router>
    <Navbar />
    <main>
        <Route path="/">
        <Frontpage />
        </Route>
        <Route path="/login">
            <Signin />
        </Route>
        <Route path="/register">
            <Signup />
        </Route>
    </main>
</Router>