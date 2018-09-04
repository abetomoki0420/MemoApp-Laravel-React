<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['memo_id' , 'name'];

    public function memo(){
      return $this->belongsTo('App\Memo');
    }
}
