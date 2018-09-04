<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SampleController extends Controller
{
    //
    public function react(){
      return view('sample');
    }

    public function test(){
      $datas = [
        [
          "title"=>"title3",
          "body"=>"aaaaaaaaa",
          "created_at", "111111" ,
          "updated_at","3333",
          "tags"=>["tag5","tag6"]
        ]
      ];

      return json_encode( $datas );
    }
}
