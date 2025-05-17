<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" type="image/png" href="{{ Vite::asset('resources/favicon/favicon-96x96.png') }}" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="{{ Vite::asset('resources/favicon/favicon.svg') }}" />
        <link rel="shortcut icon" href="{{ Vite::asset('resources/favicon/favicon.ico') }}" />
        <link rel="apple-touch-icon" sizes="180x180" href="{{ Vite::asset('resources/favicon/apple-touch-icon.png') }}" />
        <link rel="manifest" href="{{ Vite::asset('resources/favicon/site.webmanifest') }}" />

        <title>Nuggets</title>

        @vite(['resources/css/app.scss', 'resources/js/app.js'])
    </head>
    <body class="app">
        <x-header/>
        <x-footer/>
        <x-cursor/>
    </body>
</html>
