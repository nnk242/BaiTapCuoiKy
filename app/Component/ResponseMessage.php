<?php

namespace App\Component;

class ResponseMessage
{
    protected static function message($message)
    {
        if ($message === null) return false;
        else return array('message' => $message);
    }

    protected static function headers($headers)
    {
        if ($headers === null) return false;
        else return array($headers);
    }


    public static function responseMessage($success = true, $message = null, $status = 200, $headers = null)
    {

        $data = array('success' => $success);

        self::message($message) ? $data = array_merge_recursive($data, array('message' => self::message($message))) : '';

        if ($headers === null) {
            return response()->json(
                $data,
                $status
            );
        }

        return response()->json(
            $data,
            $status,
            self::headers($headers)
        );
    }
}
