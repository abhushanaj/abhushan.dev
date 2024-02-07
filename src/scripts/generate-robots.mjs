import { readFile, writeFile } from 'fs/promises';
import path from 'path';

import { getConfigProperties } from './utils.mjs';

/* Generate a robots text file */
async function generateRobotsFile() {
	try {
		const configProperties = await getConfigProperties();

		if (!configProperties) {
			throw new Error('Update config to have right settings at robots-config.mjs');
		}

		const { siteUrl = 'https://example.com', crawlPolicies = {}, additionalSitemaps = [] } = configProperties;

		const outputPath = path.resolve(process.cwd(), 'public/robots.txt');
		const robotsFancyText = await readFile(path.resolve(process.cwd(), 'src/scripts/abhushan.dev.txt'));

		const robotsContent = [];

		// Push Crawl Policies into robots file
		if (Object.entries(crawlPolicies).length > 0) {
			Object.entries(crawlPolicies).forEach(([policy, { allow = [], disallow = [] }]) => {
				robotsContent.push(`User-agent: ${policy}`);
				if (allow.length > 0) {
					allow.forEach((allowOption) => {
						robotsContent.push(`Allow: ${allowOption}`);
					});
					robotsContent.push('\n');
				}
				if (disallow.length > 0) {
					disallow.forEach((allowOption) => {
						robotsContent.push(`Disallow: ${allowOption}`);
					});
					robotsContent.push('\n');
				}
			});
		}

		if (siteUrl) {
			robotsContent.push(`Host: ${siteUrl}`);
			robotsContent.push('\n');

			// Push root sitemap to robots file
			robotsContent.push(`# Sitemaps:`);
			robotsContent.push(`Sitemap: ${siteUrl}/sitemap.xml`);

			if (additionalSitemaps.length > 0) {
				robotsContent.push(
					...additionalSitemaps.map((sitemap) => {
						const sitemapEntry = `Sitemap: ${siteUrl}${sitemap}`;
						return sitemapEntry;
					})
				);
			}
		}

		robotsContent.push('\n');
		robotsContent.push(robotsFancyText);

		await writeFile(outputPath, robotsContent.join('\n'));

		// eslint-disable-next-line no-console
		console.log('✅', 'Generated robots file');
	} catch (err) {
		console.error(err, '❌ Error generating robots.txt file');
	}
}

await generateRobotsFile();
// eslint-disable-next-line no-console
console.log('✅', 'Robots generated successfully!');
