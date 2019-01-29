<?php

namespace App\Http\Controllers\API;

use App\Component\DataTable;
use App\Component\ResponseMessage;
use App\Distributor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

//        return $command;

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

    public function stopProviding(Request $request) {
        $dt = new DataTable();
        return $dt->dataTable($this->model(), $request, 'name_distributors',
            array('id', 'name_distributors', 'phone', 'image', 'address', 'status', 'description'), 'onlyTrashed');
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
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        return response()->json(null, 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $item = $this->model()::findOrFail($id);
        if (!$item) {
            return ResponseMessage::responseMessage(false, 'Sorry, item cannot be found', 400);
        }
        if ($item->delete()) {
            return ResponseMessage::responseMessage(true);
        } else {
            return ResponseMessage::responseMessage(false, null, 500);
        }
    }
}
