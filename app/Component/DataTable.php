<?php

namespace App\Component;


class DataTable
{
    protected static $first;
    //per page
    protected static $default_per_page = 10;
    protected static $min_per_page = 1;
    protected static $max_per_page = 200;

    protected function perPage($per_page)
    {
        if ($per_page && $per_page >= self::$min_per_page && $per_page < self::$max_per_page)
            return (int)$per_page;
        return self::$this->default_per_page;
    }

    protected function filter($filter, $requestFilter)
    {
        return ["$filter", 'LIKE', "%$requestFilter%"];
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

        self::$first = 0;

        // order
        if ($request->sort) {
            $list = $model::onlyTrashed()->orderBy($this->orderHandle($request->sort));
            self::$first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if (self::$first == 1)
                    $list = $list->where($this->filter($filter, $request->filter));
                else
                    $list = $rows ? $model::onlyTrashed()->select($rows)->where($this->filter($filter, $request->filter)) :
                        $model::onlyTrashedall()->where($this->filter($filter, $request->filter));

                self::$first = 1;
            }
        }

        if (self::$first == 1) $list = $list->paginate($per_page);
        else $list = $rows ? $model::onlyTrashed()->select($rows)->paginate($per_page) : $model::paginate($per_page);

        return $list;
    }

    protected function getWithTrashed($model, $request, $filter, $rows)
    {
        if ($request->get_simple_all)
            return $model::withTrashed()->get();

        $per_page = $this->perPage($request->per_page);

        self::$first = 0;

        // order
        if ($request->sort) {
            $list = $model::withTrashed()->orderBy($this->orderHandle($request->sort));
            self::$first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if (self::$first == 1)
                    $list = $list->where($this->filter($filter, $request->filter));
                else
                    $list = $rows ? $model::withTrashed()->select($rows)->where($this->filter($filter, $request->filter)) :
                        $model::withTrashed()->where($this->filter($filter, $request->filter));

                self::$first = 1;
            }
        }

        if (self::$first == 1) $list = $list->paginate($per_page);
        else $list = $rows ? $model::withTrashed()->select($rows)->paginate($per_page) : $model::withTrashed()->paginate($per_page);

        return $list;
    }

    protected function getNormalTable($model, $request, $filter, $rows)
    {
        if ($request->get_simple_all)
            return $model::all();

        $per_page = $this->perPage($request->per_page);

        self::$first = 0;

        // order
        if ($request->sort) {
            $list = $model::orderBy($this->orderHandle($request->sort));
            self::$first = 1;
        }

        // search.
        if ($filter) {
            if ($request->filter) {
                if (self::$first == 1)
                    $list = $list->where($this->filter($filter, $request->filter));
                else
                    $list = $rows ? $model::select($rows)->where($this->filter($filter, $request->filter)) :
                        $model::where($this->filter($filter, $request->filter));
                self::$first = 1;
            }
        }

        if (self::$first == 1) $list = $list->paginate($per_page);
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

    public function destroyItem()
    {

    }
}
