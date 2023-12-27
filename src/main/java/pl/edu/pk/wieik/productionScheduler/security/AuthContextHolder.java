package pl.edu.pk.wieik.productionScheduler.security;

import pl.edu.pk.wieik.productionScheduler.security.dto.AuthParams;

public class AuthContextHolder {
    private static final ThreadLocal<AuthParams> AUTH_PARAMS = new ThreadLocal();

    public AuthContextHolder() {
    }

    public static AuthParams getAuthParams() {
        return (AuthParams)AUTH_PARAMS.get();
    }

    public static void setAuthParams(AuthParams authParams) {
        AUTH_PARAMS.set(authParams);
    }

    public static void setAuthParams(String token, Long userId) {
        setAuthParams(new AuthParams(token, userId));
    }

    public static void clear() {
        AUTH_PARAMS.remove();
    }
}