<script>
    import { Router, Link, Route } from "svelte-navigator";
    import Frontpage from "./routes/Frontpage.svelte";
    import Signin from "./routes/Login.svelte";
    import Signup from "./routes/Register.svelte";
</script>

<Router>
    <nav>
        <Link to="/">Products</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
    </nav>
    <Route path="/">
        <Frontpage />
    </Route>
    <Route path="/login">
        <Signin />
    </Route>
    <Route path="/register">
        <Signup />
    </Route>
</Router>