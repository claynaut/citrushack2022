/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    discord: process.env.DISCORD_INVITE,
  },
}

module.exports = nextConfig