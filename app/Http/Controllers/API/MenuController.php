<?php

namespace App\Http\Controllers\API;

use App\Component\DataTable;
use App\Http\Controllers\Controller;
use App\Model\Kind;
use App\Model\Menu;
use App\Model\Per;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    private function model()
    {
        return Menu::class;
    }

    public function index(Request $request)
    {
        $dt = new DataTable();
        return $dt->dataTable($this->model(), $request, 'name',
            array('id', 'name', 'name_seo', 'image', 'description', 'price', 'discount', 'ingredient', 'calo', 'per_id',
                'kind_id', 'status'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data = $this->model()::create([
            'name' => $request->name,
            'name_seo' => str_seo($request->name),
            'description' => $request->description,
            'price' => $request->price,
            'discount' => $request->discount,
            'discount_to' => $request->date[0],
            'discount_end' => $request->date[1],
            'ingredient' =>  implode("|", $request->ingredient),
            'calo' =>  $request->calo,
            'per_id' =>  $request->per,
            'kind_id' =>  $request->kind,
            'status' => '0'
        ]);
        return $data;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        //
    }

    public function per() {
        return Per::all();
    }

    public function kind() {
        return Kind::all();
    }
}
