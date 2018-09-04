<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    protected $fillable = ['user_id' , 'content'];

    public function user(){
      return $this->belongsTo('App\User');
    }

    public function tags(){
      return $this->hasMany('App\Tag');
    }
}
