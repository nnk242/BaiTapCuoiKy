<?php

use Illuminate\Database\Seeder;
use App\Distributor;

class DistributorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = ['active', 'non-active', 'block'];
        $fake = Faker\Factory::create('vi_VN');
        for ($i = 0; $i <= rand(10, 30); $i++) {
            Distributor::create([
                'first_name' => $fake->firstName,
                'last_name' => $fake->lastName,
                'name_distributors' => $fake->name,
                'phone' => $fake->phoneNumber,
                'address' => $fake->streetAddress,
                'status' => $status[rand(0, 2)],
            ]);
        }
    }
}
