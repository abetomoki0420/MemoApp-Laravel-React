@extends('layouts.app_header')

@section('title' , 'Memo App')

@section('stylesheet')
  <link rel="stylesheet" href="{{ asset('css/memo.css') }}"></link>
@endsection

@section('content')
  <div id="content"></div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
  <script src="{{asset('/js/sample.js')}}"></script>
@endsection
