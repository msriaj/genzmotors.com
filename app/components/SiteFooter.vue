<script setup lang="ts">
import { dealer, fullAddress, showrooms, telLink, whatsappLink } from '~/data/dealer'
import { bikes } from '~/data/bikes'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-black text-white">
    <div class="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
      <div>
        <BrandLogo class="h-10 w-auto text-white" />
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
          {{ dealer.role }} and {{ dealer.centreType }} in Uttara, Dhaka. Part of
          <a
            :href="dealer.parent.url"
            target="_blank"
            rel="noopener"
            class="text-white transition-colors hover:text-gpx"
          >{{ dealer.parent.name }}</a>.
        </p>
      </div>

      <div>
        <h2 class="eyebrow mb-5">Motorcycles</h2>
        <ul class="space-y-3 text-sm">
          <li v-for="bike in bikes" :key="bike.slug">
            <NuxtLink
              :to="`/motorcycles/${bike.slug}`"
              class="text-white/60 transition-colors hover:text-gpx"
            >
              {{ bike.name }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/motorcycles" class="text-white/60 transition-colors hover:text-gpx">
              Full lineup
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/gear" class="text-white/60 transition-colors hover:text-gpx">
              Helmets &amp; gear
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="eyebrow mb-5">Visit &amp; support</h2>
        <ul class="space-y-3 text-sm">
          <li>
            <NuxtLink to="/showrooms" class="text-white/60 transition-colors hover:text-gpx">
              Both showrooms
            </NuxtLink>
          </li>
          <li v-for="showroom in showrooms" :key="showroom.slug">
            <NuxtLink :to="showroom.route" class="text-white/60 transition-colors hover:text-gpx">
              {{ showroom.name }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/test-ride" class="text-white/60 transition-colors hover:text-gpx">
              Book a test ride
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/service-support" class="text-white/60 transition-colors hover:text-gpx">
              Service &amp; spare parts
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/authorized-dealer" class="text-white/60 transition-colors hover:text-gpx">
              Authorized dealer
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="text-white/60 transition-colors hover:text-gpx">Contact</NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <h2 class="eyebrow mb-5">Showrooms</h2>
        <ul class="space-y-4">
          <li v-for="showroom in showrooms" :key="showroom.slug">
            <NuxtLink
              :to="showroom.route"
              class="font-display text-sm uppercase tracking-[0.16em] text-white transition-colors hover:text-gpx"
            >
              {{ showroom.city }}
            </NuxtLink>
            <address v-if="showroom.street" class="not-italic text-sm leading-relaxed text-white/60">
              {{ showroom.street }}, {{ showroom.area }}
            </address>
            <p v-else class="text-sm text-white/60">Call for directions</p>
          </li>
        </ul>
        <div class="mt-5 flex flex-col gap-2 text-sm">
          <a :href="telLink()" class="text-white transition-colors hover:text-gpx">
            {{ dealer.contact.phoneDisplay }}
          </a>
          <a
            :href="whatsappLink('Hi Gen-Z Motors, I have a question about GPX motorcycles.')"
            target="_blank"
            rel="noopener"
            class="text-white transition-colors hover:text-gpx"
          >
            WhatsApp
          </a>
          <a
            v-if="dealer.contact.email"
            :href="`mailto:${dealer.contact.email}`"
            class="text-white transition-colors hover:text-gpx"
          >
            {{ dealer.contact.email }}
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-white/12">
      <div
        class="container-x flex flex-col gap-3 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between"
      >
        <p>&copy; {{ year }} {{ dealer.legalName }}. All rights reserved.</p>
        <NuxtLink to="/sitemap" class="text-white/60 transition-colors hover:text-gpx">
          Sitemap
        </NuxtLink>
        <p>GPX is a trademark of its respective owner. Gen-Z Motors is an authorized dealer.</p>
      </div>
    </div>
  </footer>
</template>
