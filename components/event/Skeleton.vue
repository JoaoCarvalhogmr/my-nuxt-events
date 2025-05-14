<template>
  <ul class="flex flex-col gap-2 mt-2">
    <li v-for="i in 3" :key="i">
      <UCard class="rounded-xl border border-gray-700 bg-[#162037] shadow-md text-white">
        <template #header>
          <div class="flex items-center gap-4">
            <USkeleton class="h-7 w-7 rounded-full" />
            <div class="flex-1 space-y-2">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-3 w-1/2" />
            </div>
            <USkeleton class="h-5 w-5 rounded" />
          </div>
        </template>
      </UCard>
    </li>
  </ul>
</template>
