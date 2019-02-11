<?php

namespace App\Component;


class DataTable
{
    //per page
    protected function perPage($per_page)
    {
        if ($per_page && $per_page > 0 && $per_page < 200)
            return (int)$per_page;
        return 10;
    }

    protected function orderHandle($stringSort)
    {
        $order_handle = explode('|', $stringSort);
        return [$order_handle[0], $order_handle[1]];
    }

    protected function getOnlyTrashed($model, $request, $filter, $rows)
    {
        if ($request->get_simple_all)
            return $model::onlyTrashed()->get();

        $per_page = $this->perPage($request->per_page);

        $first = 0;

        // order
        if ($request->sort) {
            $list = $model::onlyTrashed()->orderBy($this->orderHandle($request->sort)[0], $this->orderHandle($request->sort)[1]);
            $first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if ($first == 1)
                    $list = $list->where("$filter", 'LIKE', "%$request->filter%");
                else
                    $list = $rows ? $model::onlyTrashed()->select($rows)->where("$filter", 'LIKE', "%$request->filter%") :
                        $model::onlyTrashedall()->where("$filter", 'LIKE', "%$request->filter%");

                $first = 1;
            }
        }

        if ($first == 1) $list = $list->paginate($per_page);
        else $list = $rows ? $model::onlyTrashed()->select($rows)->paginate($per_page) : $model::paginate($per_page);

        return $list;
    }

    protected function getWithTrashed($model, $request, $filter, $rows)
    {
        if ($request->get_simple_all)
            return $model::withTrashed()->get();

        $per_page = $this->perPage($request->per_page);

        $first = 0;

        // order
        if ($request->sort) {
            $list = $model::withTrashed()->orderBy($this->orderHandle($request->sort)[0], $this->orderHandle($request->sort)[1]);
            $first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if ($first == 1)
                    $list = $list->where("$filter", 'LIKE', "%$request->filter%");
                else
                    $list = $rows ? $model::withTrashed()->select($rows)->where("$filter", 'LIKE', "%$request->filter%") :
                        $model::withTrashed()->where("$filter", 'LIKE', "%$request->filter%");

                $first = 1;
            }
        }

        if ($first == 1) $list = $list->paginate($per_page);
        else $list = $rows ? $model::withTrashed()->select($rows)->paginate($per_page) : $model::withTrashed()->paginate($per_page);

        return $list;
    }

    protected function getNormalTable($model, $request, $filter, $rows)
    {
        if ($request->get_simple_all)
            return $model::all();

        $per_page = $this->perPage($request->per_page);

        $first = 0;

        // order
        if ($request->sort) {
            $list = $model::orderBy($this->orderHandle($request->sort)[0], $this->orderHandle($request->sort)[1]);
            $first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if ($first == 1)
                    $list = $list->where("$filter", 'LIKE', "%$request->filter%");
                else
                    $list = $rows ? $model::select($rows)->where("$filter", 'LIKE', "%$request->filter%") :
                        $model::where("$filter", 'LIKE', "%$request->filter%");
                $first = 1;
            }
        }

        if ($first == 1) $list = $list->paginate($per_page);
        else $list = $rows ? $model::select($rows)->paginate($per_page) : $model::paginate($per_page);

        return $list;
    }

    public function dataTable($model, $request, $filter = null, $rows = null, $trash = '')
    {
        switch ($trash) {
            case 'withTrashed':
                return $this->getWithTrashed($model, $request, $filter, $rows);
                break;
            case 'onlyTrashed':
                return $this->getOnlyTrashed($model, $request, $filter, $rows);
                break;
            default:
                return $this->getNormalTable($model, $request, $filter, $rows);
        }
    }

    public static function destroyItem($model, $id)
    {
        $item = $model::findOrFail($id);
        if (!$item) {
            return ResponseMessage::responseMessage(false, 'Sorry, item cannot be found', 400);
        }
        if ($item->delete()) {
            return ResponseMessage::responseMessage(true);
        } else {
            return ResponseMessage::responseMessage(false, null, 500);
        }
    }

    public static function restoreItem($model, $param, $type = 'delete', $trash = null)
    {
        if ($param === 'all') {
            if ($trash === 'with') {
                $model::withTrashed()->restore();
            } else {
                $model::onlyTrashed()->restore();
            }
        } else {
            if ($trash === 'with') {
                $model::withTrashed()->find($param)->restore();
            } else {
                $model::onlyTrashed()->find($param)->restore();
            }
        }
    }
}
