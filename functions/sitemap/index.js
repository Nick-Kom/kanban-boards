const sm = require('sitemap')
const getAllServices = require('./../boards').getAllNewPagesContent

const generateSitemap = urls =>
	sm.createSitemap({
		hostname: `${process.env.NUXT_ENV_SPAFINDER}/blog/find/services`,
		cacheTime: 1000 * 60 * 60 * 24, // one day - cache purge period
		urls
	})

const sitemap = (req, res) =>
	getAllServices()
		.then(servicesInformation =>
			generateSitemap(
				servicesInformation.map(({ feed: service }) => ({
					url: `${service['post-data']['post_name']}/`,
					lastmod: service['post-data']['post_date'],
					changefreq: 'daily'
				}))
			).toXML((err, xml) => {
				if (err) {
					console.error(err)
					return res.status(500).end()
				}
				res.header('Content-Type', 'application/xml')
				return res.send(xml)
			})
		)
		.catch(error => console.error(error))

module.exports = sitemap
