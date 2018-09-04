let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.react('resources/assets/js/app.js', 'public/js')
//    .sass('resources/assets/sass/app.scss', 'public/css');

mix.react('resources/assets/js/components/Example.js' , 'public/js/sample.js')
    .sass('resources/assets/sass/sample.scss' , 'public/css/sample.css')
    .sass('resources/assets/sass/memo.scss' , 'public/css/memo.css')
    .sass('resources/assets/sass/app_header.scss' , 'public/css/app_header.css');
