export function isAuth ({next, router}) {
    if (!localStorage.getItem('user')) {
        return router.push({name: 'login'});
    }

    return next();
}
