import { createOidc } from "oidc-spa";
import {useState} from 'react'
import {useAsyncEffect} from './useAsyncEffect'
import { create } from 'zustand'
import { combine } from 'zustand/middleware'

type TokenInfo = {
    inseegroupdefault: string[],
    preferred_username: string
}

const guestTokenInfo = {
    preferred_username: 'Guest',
    inseegroupdefault: ['base']
}

export const useUser = create(
    combine({
        username: '',
        roles: [] as string[],
        token: '',
    }, (set) => ({
        setUser: (accessToken: string, tokenInfo: TokenInfo) => set({
            username: tokenInfo.preferred_username,
            roles: tokenInfo.inseegroupdefault,
            token: accessToken
        }),
    }))
)

export const useHasRole = (role: string): boolean => {
    const roles = useUser(v => v.roles);
    return roles.includes(role)
}

export const useAccessToken = (): string => {
    return useUser(v => v.token)
}

export function useLogin(): boolean {
    const isOidc = import.meta.env.VITE_AUTH_TYPE === 'oidc'
    const [authenticated, setAuthenticated] = useState(false);
    const setUser = useUser(v => v.setUser)

    useAsyncEffect(async () => {
        if (!isOidc) {
            setTimeout(() => {
                setUser('', guestTokenInfo)
                setAuthenticated(true)
            }, 1000)
            return
        }
        const oidc = await createOidc<TokenInfo>({
            issuerUri: "https://auth.insee.test/auth/realms/questionnaire-particuliers",
            clientId: "coleman-pilotage",
            publicUrl: "/"
        });
        if (!oidc.isUserLoggedIn) {
            await oidc.login({
                doesCurrentHrefRequiresAuth: false,
                extraQueryParams: { kc_idp_hint: "insee-ssp" }
           });
           return
        } 
        const {accessToken, decodedIdToken} = oidc.getTokens()
        setUser(accessToken, decodedIdToken)
        setAuthenticated(true);
    }, []) 

    return authenticated
}