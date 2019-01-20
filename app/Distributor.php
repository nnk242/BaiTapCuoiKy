<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Distributor extends Model
{
    use SoftDeletes;

    protected $table = 'distributors';

    protected $fillable = [
        'name', 'image', 'phone', 'address', 'description', 'status'
    ];


}
