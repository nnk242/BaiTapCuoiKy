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
        $this->middleware('auth:api', ['except' => ['index']]);
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
    public function index()
    {
        $data = $this->model()::all();
        return Response::json(['message' => $data]);
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
