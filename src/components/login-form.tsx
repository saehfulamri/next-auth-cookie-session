"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";

export default function LoginForm() {
    const [state, formAction] = useFormState<any, FormData>(login, undefined);
    return (
        <form action={formAction}>
            <input
                type="text"
                name="username"
                required
                id="username"
                placeholder="username"
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
            />
            <button>Login</button>
            {state?.error && <p>{state.error}</p>}
        </form>
    );
}
