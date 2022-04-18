import { writable, readable } from 'svelte/store';

export const token = writable(null, set => set(localStorage.getItem('token')));
token.subscribe(token => localStorage.setItem('token', token));

export const user = readable(null, set => {
    const unsubscribe = token.subscribe(async (token) => {
        if (token) {
            const response = await fetch('http://localhost:3000/users/@me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                set(data);
            } else {
                set(null);
            }
        } else {
            set(null);
        }
    });
    return () => unsubscribe();
});