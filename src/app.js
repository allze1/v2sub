export default {
    async fetch(req, env, ctx) {
        const url = new URL(req.url)

        if (url.pathname.startsWith('/api/')) {
            const { setenv } = await import('./cfenv.js')
            setenv(env)

            const { default: api } = await import('./api.js')
            return api.fetch(req, env, ctx)
        }

        const asset = await env.assets.fetch(req)
        if (asset.status === 404 && !url.pathname.includes('.')) {
            const spa = new Request(new URL('/', req.url), req)
            return env.assets.fetch(spa)
        }

        return asset
    }
}
