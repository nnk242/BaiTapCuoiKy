<?php

namespace App\Http\Controllers\API;

use App\Component\DataTable;
use App\Distributor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DistributorController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['test']]);
    }

    //model Distributor
    private function model()
    {
        return Distributor::class;
    }

    public function test()
    {
//        $conmmand = "python3.6 /var/www/html/test.py";
//        $pid = popend($command, "r");
//        while(!feof($pid)) {
//            echo fread($pid, 256);
//            flush();
//            usleep(100000);
//        }
//        pclose($pid);
        $cmd = "python3.6 /var/www/html/test.py";
        $str = "'Vừa smartbidv, vừa bidv online mà lại k dùng chung 1 tài khoản đăng nhập, rắc rối!'";

        $command = exec($cmd . " " . $str);

        $result = strtolower(shell_exec($command));

        if (strlen($result) > 3) {
            $result = strstr($result, "#");

            $end = strpos($result, '\'');

            return substr($result, 1, $end - 1);
        }
        return 'neutral';
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $dt = new DataTable();
        return $dt->dataTable($this->model(), $request, 'name_distributors',
            array('id', 'name_distributors', 'phone', 'image', 'address', 'status', 'description'));
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
    public function destroy($id)
    {
        //
        return $id;
    }
}
