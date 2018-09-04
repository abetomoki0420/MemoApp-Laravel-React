<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}" >
    <title>@yield('title')</title>
    <!-- <link rel="stylesheet" href="{{ asset('css/app_header.css') }}"></link> -->
    @yield('stylesheet')
  </head>
  <body>
    <!-- <div class="app-header">
      <div class="search-bar-area">
        <input type="text" >
      </div>
      <div class="create-btn-area">
        <input type="button" value="新規作成">
      </div>
    </div> -->
    @yield('content')
  </body>
</html>
