<script setup lang="ts">
/**
 * A choice that opens WhatsApp with the message already written.
 *
 * The site collects nothing: there are no inputs anywhere, so every enquiry starts as a
 * real conversation in the visitor's own WhatsApp thread, where they keep a copy.
 */
import { whatsappLink } from '~/data/dealer'

defineProps<{
  /** Headline for the choice, e.g. a model name or a topic. */
  title: string
  /** One line of context under the title. */
  detail?: string
  /** Small label above the title. */
  eyebrow?: string
  /** Message pre-written into WhatsApp. */
  message: string
  /** Optional secondary links, e.g. one per showroom. */
  branches?: { label: string; message: string }[]
}>()
</script>

<template>
  <div class="group flex h-full flex-col border border-line bg-card p-6 transition-colors duration-500 hover:border-gpx/60 lg:p-8">
    <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
    <h3 class="font-display text-xl uppercase leading-tight text-ink lg:text-2xl">{{ title }}</h3>
    <p v-if="detail" class="mt-3 text-sm leading-relaxed text-muted">{{ detail }}</p>

    <div v-if="branches?.length" class="mt-auto pt-7">
      <p class="eyebrow mb-3 text-[0.62rem]">Message us about</p>
      <div class="flex flex-wrap gap-3">
        <AppButton
          v-for="branch in branches"
          :key="branch.label"
          :href="whatsappLink(branch.message)"
          variant="ghost"
        >
          {{ branch.label }}
        </AppButton>
      </div>
    </div>

    <div v-else class="mt-auto pt-7">
      <AppButton :href="whatsappLink(message)">Message on WhatsApp</AppButton>
    </div>
  </div>
</template>
