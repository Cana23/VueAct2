<template>
    <header class="header-bg shadow-md w-full z-10 top-0">
        <div class="container mx-auto px-4 py-2">
            <h1 class="font-bold text-2xl">Simulacion de ataques</h1>
            <nav>
                <ul class="list-none flex space-x-6">
                    <slot name="Lista" />
                </ul>
            </nav>
        </div>
    </header>
</template>