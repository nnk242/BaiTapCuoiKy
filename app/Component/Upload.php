<?php

namespace App\Component;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Upload
{

    protected function makeFolder()
    {
        if (!file_exists($this->folderToday())) {
            mkdir($this->folder . date('Y-m-d'), 0777, true);
        }
    }

    public function uploadAvatar($file, $fileOld)
    {
        $file_name = str_random(rand(5, 10)) . '_' . time() . '.' . $file->getClientOriginalExtension();
        $path = 'uploads/' . date('Y-m-d');
        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }
        if (Storage::disk('uploads')->put($path . '/' . $file_name, File::get($file)) === true) {
            $this->destroyAvatar(substr($fileOld, 1));
            return ['message' => [
                'path' => '/' . $path . '/' . $file_name,
                'status' => true
            ]];
        } else
            return ['message' => [
                'path' => '',
                'status' => false
            ]];
    }

    public function destroyAvatar($path)
    {
        Storage::disk('uploads')->delete($path);
    }
}
