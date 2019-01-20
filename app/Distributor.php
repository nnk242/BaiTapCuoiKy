<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Distributor extends Model
{
    use SoftDeletes;

    protected $table = 'distributors';

    protected $fillable = [
        'first_name', 'last_name', 'name_distributors', 'image', 'phone', 'address', 'description', 'status'
    ];

    protected $dates = ['deleted_at'];
}
