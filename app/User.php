<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    //
    protected $fillable = ['name' , 'password'];

    public function memos(){
      return $this->hasMany('App\Memo');
    }
}
