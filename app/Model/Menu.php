<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    //
    protected $table = 'menus';
    protected $fillable = ['name', 'name_seo', 'image', 'description', 'price', 'discount', 'discount_to', 'discount_end', 'ingredient', 'calo', 'per_id', 'kind_id', 'status'];
}
