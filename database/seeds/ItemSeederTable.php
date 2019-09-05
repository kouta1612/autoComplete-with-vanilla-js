<?php

use App\Item;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Item::truncate();

        $file = new SplFileObject(database_path('csv/item.csv'));
        $file->setFlags(
            SplFileObject::READ_CSV |
            SplFileObject::READ_AHEAD |
            SplFileObject::SKIP_EMPTY |
            SplFileObject::DROP_NEW_LINE
        );
        $list = [];
        $now = Carbon::now();
        foreach ($file as $key => $line) {
            if ($key == 0) continue;
            $list[] = [
                'id' => $line[0],
                'jp_name' => $line[1],
                'en_name' => $line[2],
                'hiragana' => $line[3],
                'katakana' => $line[4],
                'parent_id' => $line[5],
                'created_at' => $now,
                'updated_at' => $now
            ];
        }
        DB::table('items')->insert($list);
    }
}
