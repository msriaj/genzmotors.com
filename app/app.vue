<script setup lang="ts">
/**
 * Site-wide structured data. Declared here rather than through the module's `identity`
 * option so the business is typed as a motorcycle dealer instead of a bare Organization.
 * Fields Gen-Z Motors has not published (opening hours, email, geo) are omitted rather
 * than guessed.
 */
import { allAreasServed, dealer, primaryShowroom } from '~/data/dealer'

const site = useSiteConfig()
const showroom = primaryShowroom()

// Social defaults for every page; individual pages override title and description.
useSeoMeta({
  ogSiteName: dealer.name,
  ogLocale: 'en_BD',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  author: dealer.name,
})

useSchemaOrg([
  defineLocalBusiness({
    '@type': ['AutoDealer', 'MotorcycleDealer'],
    'name': dealer.name,
    'description':
      'Authorized GPX Motorcycles dealer with showrooms in Uttara, Dhaka and in Mymensingh. The Uttara branch is a 3S centre: sales, service and genuine spare parts.',
    'url': site.url,
    'logo': '/images/brand/genz-motors-logo.png',
    'image': '/images/brand/genz-motors-logo.png',
    'telephone': dealer.contact.phoneDial,
    'currenciesAccepted': 'BDT',
    'address': {
      streetAddress: `${showroom.street}, ${showroom.area}`,
      addressLocality: showroom.city,
      addressRegion: dealer.address.region,
      addressCountry: dealer.address.countryCode,
    },
    'areaServed': allAreasServed().map((name) => ({ '@type': 'Place', name })),
    'brand': { '@type': 'Brand', name: 'GPX Motorcycles' },
    'parentOrganization': { '@type': 'Organization', name: dealer.parent.name, url: dealer.parent.url },
    'sameAs': [dealer.parent.url],
  }),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
