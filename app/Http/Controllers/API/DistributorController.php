<?php

namespace App\Http\Controllers\API;

use App\Distributor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class DistributorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['indexs']]);
    }

    //model Distributor
    private function model()
    {
        return Distributor::class;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if($request->get_simple_all){
            return $this->model()::select('id', 'name_distributors')->get();
        }

        if($request->per_page && $request->per_page > 0 && $request->per_page < 200){
            $per_page = (int)$request->per_page;
        }else{
            $per_page = 10;
        }
        $first = 0;

        // order
        if($request->sort){
            $order_handle = explode('|',$request->sort);
            $list = $this->model()::orderBy($order_handle[0], $order_handle[1]);
            $first = 1;
        }

        // search.
        if($request->filter){
            if($first == 1){
                $list = $list->where('name_distributors', 'LIKE', "%$request->filter%");
            }else{
                $list = $this->model()::where('name_distributors', 'LIKE', "%$request->filter%");
            }
            $first = 1;
        }

        if($first == 1){
            $list = $list->paginate($per_page);
        }else{
            $list =  $this->model()::paginate($per_page);
        }

        return $list;
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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Distributor $distributor
     * @return \Illuminate\Http\Response
     */
    public function show(Distributor $distributor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Distributor $distributor
     * @return \Illuminate\Http\Response
     */
    public function edit(Distributor $distributor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Distributor $distributor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Distributor $distributor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Distributor $distributor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Distributor $distributor)
    {
        //
    }
}
