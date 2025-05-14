<script setup>
import { SignInButton, SignOutButton, useAuth } from '@clerk/vue'

const { sessionId } = useAuth()
</script>

<template>
  <div>
    <SignInButton v-if="!sessionId">
      <template #default="{ handler }">
        <UButton 
          color="primary"
          size="sm"
          icon="i-lucide-log-in"
          label="Sign In"
          @click="handler"
        />      </template>
    </SignInButton>

    <SignOutButton v-else :sign-out-options="{ sessionId }">
      <template #default="{ handler }">
        <UButton 
          color="gray"
          size="sm"
          icon="i-lucide-log-out"
          label="Sign Out"
          @click="handler"
        />      
    </template>
    </SignOutButton>
  </div>
</template>
