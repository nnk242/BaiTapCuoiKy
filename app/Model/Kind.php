<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Kind extends Model
{
    //
    protected $table = 'kind';
    protected $fillable = ['name', 'name_seo', 'description', 'image', 'status'];
}
