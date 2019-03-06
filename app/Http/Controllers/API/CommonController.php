<?php

namespace App\Http\Controllers\API;

use App\Component\DataTable;
use App\Http\Controllers\Controller;
use App\Model\Kind;
use App\Model\Menu;
use App\Model\Per;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    public function per()
    {
        return Per::all();
    }

    public function kind() {
        return Kind::all();
    }

    public function cart(Request $request) {
        return Menu::whereIn('id', $request->products)->get();
    }
}
