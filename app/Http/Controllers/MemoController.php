<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User ;
use App\Memo ;
use App\Tag ;

class MemoController extends Controller
{
    public function show(){
      return view('memo');
    }

    public function getMemos(){
      //仮のユーザーの取得
      $user = User::find(1);

      //ユーザーのメモ情報をJSONに変換する
      $memos = $user->memos() ;
      return $memos->with('tags')->get()->tojson();
    }

    public function createMemo(Request $request){
      //仮のユーザーの取得
      $user = User::find(1);
      $memo = new Memo();

      $memo->user_id = $user->id ;
      $memo->title = $request->input('title');
      $memo->content = $request->input('content');
      $memo->save();

      return "success" ;
    }

    public function deleteMemo(Request $request){
      //仮のユーザーの取得
      $user = User::find(1);

      $memo = Memo::find( $request->input('id'));
      $memo->delete();
      return "success";
    }

    public function modifyMemo(Request $request){
      $memo = Memo::find( $request->input('id'));
      $memo->title = $request->input('title');
      $memo->content = $request->input('content');
      $memo->save();

      var_dump( $memo->title );
      var_dump( $request->input('title'));
      return "success";
    }
}
