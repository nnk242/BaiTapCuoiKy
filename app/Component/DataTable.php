<?php

namespace App\Component;


class DataTable
{
    public function dataTable($model, $request, $fillter = null, $rows = null)
    {
        if ($request->get_simple_all)
            return $model::all();

        if ($request->per_page && $request->per_page > 0 && $request->per_page < 200)
            $per_page = (int)$request->per_page;
        else
            $per_page = 10;

        $first = 0;

        // order
        if ($request->sort) {
            $order_handle = explode('|', $request->sort);
            $list = $model::orderBy($order_handle[0], $order_handle[1]);
            $first = 1;
        }

        // search.
        if ($fillter)
            if ($request->filter) {
                if ($first == 1)
                    $list = $list->where("$fillter", 'LIKE', "%$request->filter%");
                else
                    $list = $rows ? $model::select($rows)->where("$fillter", 'LIKE', "%$request->filter%") :
                        $model::where("$fillter", 'LIKE', "%$request->filter%");

                $first = 1;
            }

        if ($first == 1)
            $list = $list->paginate($per_page);
        else
            $list = $rows ? $model::select($rows)->paginate($per_page) : $model::paginate($per_page);


        return $list;
    }

    public function destroyItem() {

    }
}
